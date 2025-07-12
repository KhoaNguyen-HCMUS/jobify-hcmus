const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
      include: {
        experiences_educations: true,
      },
    });

    if (!profile) {
      return res.status(404).json(errorResponse('Profile not found', 404));
    }

    res.json(successResponse(profile, 'Profile fetched successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch profile'));
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const updatedProfile = await prisma.user_profiles.update({
      where: { user_id: userId },
      data,
    });

    res.json(successResponse(updatedProfile, 'Profile updated successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to update profile'));
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: id },
      include: {
        experiences_educations: true,
      },
    });

    if (!profile) {
      return res.status(404).json(errorResponse('Profile not found', 404));
    }

    res.json(successResponse(profile, 'Profile fetched successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch profile'));
  }
};
