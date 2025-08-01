const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
      include: {
        experiences: true,
        educations: true,
      },
    });

    if (!profile) {
      return errorResponse(res, 'Profile not found', [], 404);
    }

    const email = req.user.email;
    profile.email = email;

    return successResponse(res, 'Profile fetched successfully', { profile });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch profile', [error.message], 500);
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      full_name,
      gender,
      date_of_birth,
      phone,
      profile_photo_url,
      bio,
      province,
      ward,
      address_detail,
      industry,
      skills,
      website,
      linkedin_url,
      github_url,
      educations = [],
      experiences = [],
    } = req.body;

    const parsedDOB = date_of_birth ? new Date(date_of_birth) : undefined;

    const userProfile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
      select: { id: true },
    });

    if (!userProfile) {
      return errorResponse(res, 'User profile not found');
    }

    const updateData = {
      full_name,
      gender,
      date_of_birth: parsedDOB,
      phone,
      profile_photo_url,
      bio,
      province,
      ward,
      address_detail,
      industry,
      skills,
      website,
      linkedin_url,
      github_url,
      updated_at: new Date(),
    };

    if (Array.isArray(experiences) && experiences.length > 0) {
      const mappedExperiences = experiences.map(exp => ({
        ...exp,
        start_date: exp.start_date ? new Date(exp.start_date) : undefined,
        end_date: exp.end_date ? new Date(exp.end_date) : undefined,
      }));

      updateData.experiences = {
        deleteMany: {},
        create: mappedExperiences,
      };
    }

    if (Array.isArray(educations) && educations.length > 0) {
      const mappedEducations = educations.map(edu => ({
        ...edu,
        start_date: edu.start_date ? new Date(edu.start_date) : undefined,
        end_date: edu.end_date ? new Date(edu.end_date) : undefined,
      }));

      updateData.educations = {
        deleteMany: {},
        create: mappedEducations,
      };
    }

    await prisma.user_profiles.update({
      where: { user_id: userId },
      data: updateData,
    });

    return successResponse(res, 'Profile updated successfully');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to update profile', [error.message], 500);
  }
};

exports.getCompanyProfiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const companyProfiles = await prisma.companies.findUnique({
      where: { user_id: userId }
    });
    if (!companyProfiles) {
      return errorResponse(res, 'Company profile not found', [], 404);
    }

    const email = req.user.email;
    companyProfiles.email = email;

    return successResponse(res, 'Company profiles fetched successfully', { companyProfiles });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch company profiles', [error.message], 500);
  }
};

exports.updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      company_name,
      website,
      tax_code,
      license_number,
      phone_number,
      description,
      address,
      industry,
      size,
      logo_url,
      cover_url,
      founded_year} = req.body;
    
    const companyProfile = await prisma.companies.findUnique({
      where: { user_id: userId },
      select: {
        id: true,
        user_id: true,
      }
    });

    if (!companyProfile) {
      return errorResponse(res, 'Company profile not found', [], 404);
    }

    await prisma.companies.update({
      where: { user_id: userId },
      data: {
        company_name,
        website,
        tax_code,
        license_number,
        phone_number,
        description,
        address,
        industry,
        size,
        logo_url,
        cover_url,
        founded_year,
        status: 'pending',
        updated_at: new Date(),
      }
    });

    return successResponse(res, 'Company profile updated successfully');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to update company profile', [error.message], 500);
  }
};

exports.getCandidateProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: id },
      include: {
        experiences: true,
        educations: true,
      },
    });

    if (!profile) {
      return errorResponse(res, 'Candidate profile not found', [], 404);
    }

    return successResponse(res, 'Candidate profile fetched successfully', profile);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch candidate profile', [error.message], 500);
  }
};

exports.getCompanyProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const companyProfile = await prisma.companies.findUnique({ where: { id }, });

    if (!companyProfile) {
      return errorResponse(res, 'Company profile not found', [], 404);
    }

    return successResponse(res, 'Company profile fetched successfully', companyProfile);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch company profile', [error.message], 500);
  }
};
