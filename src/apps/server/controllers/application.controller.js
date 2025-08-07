const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getApplicationDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await prisma.job_applications.findUnique({
      where: { id },
      include: {
        users: true, 
        file_uploads: true, 
        job_posts: true,   
        application_status_history: true, 
      },
    });

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
    const application = await prisma.job_applications.findUnique({
      where: { id },
    });

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
