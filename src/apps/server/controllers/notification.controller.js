const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notifications.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: 'desc' },
    });

    res.json(successResponse(notifications));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch notifications'));
  }
};
