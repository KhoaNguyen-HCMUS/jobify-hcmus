const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/response');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return errorResponse(res, 'Missing registration data', ['Email, password and role are required']);

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser)
      return errorResponse(res, 'Email already exists', ['Email is taken']);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        role,
        status: 'active'
      }
    });

    successResponse(res, 'Registration successful', { userId: newUser.id });
  } catch (err) {
    errorResponse(res, 'Registration failed', [err.message], 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return errorResponse(res, 'Missing login data', ['Email and password are required']);

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user)
      return errorResponse(res, 'Invalid credentials', ['Email or password is incorrect'], 401);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return errorResponse(res, 'Invalid credentials', ['Email or password is incorrect'], 401);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    successResponse(res, 'Login successful', { token });
  } catch (err) {
    errorResponse(res, 'Login failed', [err.message], 500);
  }
};

exports.logout = (req, res) => {
  successResponse(res, 'Logout successful');
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
    successResponse(res, 'Password reset request sent (demo only)');
  } catch (err) {
    errorResponse(res, 'Error sending request', [err.message], 500);
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

    successResponse(res, 'Password updated successfully');
  } catch (err) {
    errorResponse(res, 'Password update failed', [err.message], 500);
  }
};
