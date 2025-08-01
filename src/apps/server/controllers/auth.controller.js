const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/response');

exports.registerCandidate = async (req, res) => {
  const { fullname, email, password} = req.body;
  if (!fullname || !email || !password) {
    return errorResponse(res, 'Missing registration data', ['Full name, email, and password are required']);
  }

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return errorResponse(res, 'Email already exists', []);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        role: 'candidate',
        status: 'active'
      }
    });

    await prisma.user_profiles.create({
      data: {
        user_id: newUser.id,
        full_name: fullname,
        created_at: new Date()
      }
    });

    return successResponse(res, 'Registration successful', { user_id: newUser.id });
  } catch (err) {
    return errorResponse(res, 'Registration failed', [err.message], 500);
  }
};

exports.registerCompany = async (req, res) => {
  const { company_name, email, password, tax_code, license_number } = req.body;
  if (!company_name || !email || !password || !tax_code || !license_number) {
    return errorResponse(res, 'Missing registration data', ['All fields are required']);
  }

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return errorResponse(res, 'Email already exists', []);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        role: 'company',
        status: 'active',
      }
    });

    await prisma.companies.create({
      data: {
        user_id: newUser.id,
        company_name,
        tax_code,
        license_number,
        status: 'pending',
        created_at: new Date(),
      }
    });

    return successResponse(res, 'Registration successful', { userId: newUser.id, company_status: 'pending' });
  } catch (err) {
    return errorResponse(res, 'Registration failed', [err.message], 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return errorResponse(res, 'Missing login data', ['Email and password are required']);

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user)
      return errorResponse(res, 'Email or password is incorrect', [], 401);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return errorResponse(res, 'Email or password is incorrect', [], 401);

    if (user.status !== 'active') {
      return errorResponse(res, 'Account not active, please contact support to activate your account', [], 403);
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

  let name = '';

  if (['admin', 'moderator', 'candidate'].includes(user.role)) {
    const profile = await prisma.user_profiles.findUnique({ where: { user_id: user.id } });
    if (!profile)
      return errorResponse(res, 'User profile not found', [], 404);
    name = profile.full_name;
  } else if (user.role === 'company') {
    const company = await prisma.companies.findUnique({ where: { user_id: user.id } });
    if (!company)
      return errorResponse(res, 'Company profile not found', [], 404);
    name = company.company_name;
  }

    return successResponse(res, 'Login successful', { token, name, role: user.role });
  } catch (err) {
    return errorResponse(res, 'Login failed', [err.message], 500);
  }
};

exports.logout = (req, res) => {
  return successResponse(res, 'Logout successful');
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return errorResponse(res, 'Missing email', ['Email is required']);

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user)
      return errorResponse(res, 'Email not found', ['No account with this email']);

    // TODO: Generate token & send email
    return successResponse(res, 'Password reset request sent (demo only)');
  } catch (err) {
    return errorResponse(res, 'Error sending request', [err.message], 500);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword)
    return errorResponse(res, 'Missing data', ['Email and new password are required']);

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { email },
      data: { password_hash: hashedPassword }
    });

    return successResponse(res, 'Password updated successfully');
  } catch (err) {
    return errorResponse(res, 'Password update failed', [err.message], 500);
  }
};
