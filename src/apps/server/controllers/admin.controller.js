const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getPendingJobs = async (req, res) => {
  try {
    const jobs = await prisma.job_posts.findMany({
      where: { status: 'pending' },
      include: { companies: true },
      orderBy: { created_at: 'desc' }
    });

    res.json(successResponse(jobs, 'Pending jobs fetched successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch pending jobs'));
  }
};

exports.approveJob = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  try {
    const job = await prisma.job_posts.findUnique({ where: { id } });
    if (!job) return res.status(404).json(errorResponse('Job not found', 404));

    await prisma.job_posts.update({
      where: { id },
      data: {
        status: 'approved',
        approved_by: adminId,
        approved_at: new Date(),
        updated_at: new Date()
      }
    });

    res.json(successResponse(null, 'Job approved successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to approve job'));
  }
};

exports.rejectJob = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;
  const { moderator_notes } = req.body;

  try {
    const job = await prisma.job_posts.findUnique({ where: { id } });
    if (!job) return res.status(404).json(errorResponse('Job not found', 404));

    await prisma.job_posts.update({
      where: { id },
      data: {
        status: 'rejected',
        moderator_notes,
        approved_by: adminId,
        approved_at: new Date(),
        updated_at: new Date()
      }
    });

    res.json(successResponse(null, 'Job rejected successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to reject job'));
  }
};
