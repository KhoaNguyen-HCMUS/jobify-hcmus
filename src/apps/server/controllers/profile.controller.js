const prisma = require('../prisma/client');

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Giả sử middleware auth đã decode JWT và gán req.user

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
      include: {
        experiences: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
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

    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
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
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
