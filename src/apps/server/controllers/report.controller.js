const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.createReport = async (req, res) => {
  try {
    const { reported_entity_id, entity_type, reason } = req.body;

    const newReport = await prisma.reports.create({
      data: {
        reported_by: req.user.id,
        reported_entity_id,
        entity_type,
        reason,
        status: 'pending',
        created_at: new Date()
      },
    });

    res.status(201).json(successResponse(newReport, 'Report submitted successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to submit report'));
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await prisma.reports.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        users_reports_reported_byTousers: true,
        users_reports_reviewed_byTousers: true,
      }
    });

    res.json(successResponse(reports));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch reports'));
  }
};

exports.updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const report = await prisma.reports.findUnique({ where: { id } });

    if (!report) {
      return res.status(404).json(errorResponse('Report not found', 404));
    }

    const updated = await prisma.reports.update({
      where: { id },
      data: {
        status,
        reviewed_by: req.user.id,
        reviewed_at: new Date(),
      }
    });

    res.json(successResponse(updated, 'Report status updated successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to update report status'));
  }
};
