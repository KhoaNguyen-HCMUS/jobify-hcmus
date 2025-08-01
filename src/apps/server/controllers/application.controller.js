const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.applyJob = async (req, res) => {
  const { id } = req.params;
  const { candidate_id, resume_file_id, cover_letter } = req.body;

  try {
    const application = await prisma.job_applications.create({
      data: {
        job_id: id,
        candidate_id,
        resume_file_id,
        cover_letter,
        status: 'pending',
      },
    });
    return successResponse(res, 'Application submitted successfully', application, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to apply for job', [err.message], 500);
  }
};

exports.cancelApplication = async (req, res) => {
  const { id } = req.params;
  const { candidate_id } = req.body;

  try {
    await prisma.job_applications.deleteMany({
      where: { job_id: id, candidate_id },
    });
    return successResponse(res, 'Application cancelled successfully');
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to cancel application', [err.message], 500);
  }
};

exports.getJobApplications = async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await prisma.job_applications.findMany({ where: { job_id: id }, });
    return successResponse(res, 'Applications fetched successfully', applications);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch applications', [err.message], 500);
  }
};

exports.getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await prisma.job_applications.findUnique({ where: { id }, });

    if (!application) {
      return errorResponse(res, 'Application not found', [], 404);
    }

    return successResponse(res, 'Application detail retrieved', application);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to get application detail', [error.message], 500);
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus, notes, changedBy } = req.body;

  if (!newStatus || !changedBy) {
    return errorResponse(res, 'Missing required fields', ['newStatus and changedBy are required']);
  }

  try {
    const application = await prisma.job_applications.findUnique({ where: { id } });

    if (!application) {
      return errorResponse(res, 'Application not found', [], 404);
    }

    await prisma.job_applications.update({
      where: { id },
      data: {
        status: newStatus,
        notes,
        updated_at: new Date(),
      },
    });

    await prisma.application_status_history.create({
      data: {
        application_id: id,
        old_status: application.status,
        new_status: newStatus,
        notes,
        changed_by: changedBy,
        created_at: new Date(),
      },
    });

    return successResponse(res, 'Application status updated successfully');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to update application status', [error.message], 500);
  }
};
