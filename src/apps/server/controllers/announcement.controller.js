const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.system_announcements.findMany({
      where: {
        scheduled_at: {
          lte: new Date(),
        },
      },
      orderBy: { scheduled_at: 'desc' },
    });

    res.json(successResponse(announcements));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch announcements'));
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await prisma.system_announcements.findUnique({ where: { id } });

    if (!announcement) {
      return res.status(404).json(errorResponse('Announcement not found', 404));
    }

    res.json(successResponse(announcement));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch announcement'));
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, target_audience, scheduled_at, attachment_id } = req.body;

    const announcement = await prisma.system_announcements.create({
      data: {
        title,
        content,
        target_audience,
        scheduled_at: scheduled_at ? new Date(scheduled_at) : new Date(),
        created_by: req.user.id,
        attachment_id,
      },
    });

    res.status(201).json(successResponse(announcement, 'Announcement created successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to create announcement'));
  }
};
