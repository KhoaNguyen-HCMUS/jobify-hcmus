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

    return successResponse(res, 'Profile fetched successfully', profile);
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

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: id },
      include: {
        experiences: true,
        educations: true
      },
    });

    if (!profile) {
      return errorResponse(res, 'Profile not found', [], 404);
    }

    return successResponse(res, 'Profile fetched successfully', profile);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch profile', [error.message], 500);
  }
};
