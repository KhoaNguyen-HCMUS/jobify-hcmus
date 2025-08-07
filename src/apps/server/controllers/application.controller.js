const prisma = require('../prisma/client');
const supabase = require('../utils/supabaseClient');
const { successResponse, errorResponse } = require('../utils/response');
const { uploadFile } = require('../utils/supabaseStorage');
const { generateSignedUrl } = require('../utils/supabaseUrl');

exports.applyJob = async (req, res) => {
  const { id: job_id } = req.params;
  const { cover_letter } = req.body;
  const { user } = req; 
  const file = req.file;

  try {
    const applicationExists = await prisma.job_applications.findFirst({
      where: {
        job_id,
        candidate_id: user.id,
      },
    });

    if (applicationExists) {
      return errorResponse(res, 'You have already applied for this job.', [], 400);
    }

    if (!file) {
      return errorResponse(res, 'Resume file is required.', [], 400);
    }

    const job = await prisma.job_posts.findUnique({ where: { id: job_id } });
    if (!job) {
      return errorResponse(res, 'Job not found.', [], 404);
    }

    const uploadedFile = await uploadFile(file.buffer, file.originalname, file.mimetype, 'resume');

    const fileRecord = await prisma.file_uploads.create({
      data: {
        user_id: user.id,
        filename: uploadedFile.fileName,
        original_filename: file.originalname,
        file_path: `${uploadedFile.bucket}/${uploadedFile.fileName}`,
        file_size: file.size,
        mime_type: file.mimetype,
        file_type: 'resume',
        is_primary: true,
      },
    });

    const application = await prisma.job_applications.create({
      data: {
        job_id,
        candidate_id: user.id,
        resume_file_id: fileRecord.id,
        cover_letter,
        status: 'pending',
        applied_at: new Date(),
      },
    });

    return successResponse(res, 'Job application submitted successfully', {
      application_id: application.id,
    });

  } catch (err) {
    console.error('Apply Job Error:', err);
    return errorResponse(res, 'Failed to apply for job.', [err.message], 500);
  }
};

exports.cancelApplication = async (req, res) => {
  const { job_id } = req.params; 
  const { user } = req; 

  try {
    const application = await prisma.job_applications.findFirst({ 
      where: { 
        job_id,
        candidate_id: user.id,
      } 
    });

    if (!application) {
      return errorResponse(res, 'Application not found', [], 404);
    }

    if (application.candidate_id !== user.id) {
      return errorResponse(res, 'You are not authorized to cancel this application', [], 403);
    }

    await prisma.job_applications.delete({
      where: { id: application.id },
    });

    if (application.resume_file_id) {
      const filePath = `${application.resume_file_id.file_path}`; 
      const bucketName = filePath.split('/')[0];
      const fileName = filePath.split('/').slice(1).join('/');

      const { error } = await supabase.storage.from(bucketName).remove([fileName]);

      if (error) {
        console.warn('Failed to delete resume file from storage:', error.message);
      }

      await prisma.file_uploads.delete({
        where: { id: application.resume_file_id },
      });
    }

    return successResponse(res, 'Application cancelled successfully');
  } catch (err) {
    console.error('Cancel Application Error:', err);
    return errorResponse(res, 'Failed to cancel application', [err.message], 500);
  }
};

exports.getJobApplications = async (req, res) => {
  const { id: job_id } = req.params;
  const { user } = req;

  try {
    if (user.role === 'company') {
      const job = await prisma.job_posts.findUnique({
        where: { id: job_id },
      });

      if (!job || job.created_by !== user.id) {
        return errorResponse(res, 'You are not authorized to view applications for this job', [], 403);
      }
    }

    const applications = await prisma.job_applications.findMany({
      where: { job_id },
      include: {
        users: {
          select: {
            user_profiles: {
              select: {
                full_name: true,
                province: true,
                ward: true,
                industry: true,
                educations: true,
                experiences: true,
              }
            },
          },
        },
        file_uploads: true,
        application_status_history: true,
      },
    });

    const result = await Promise.all(
      applications.map(async ({ file_uploads, users, ...rest }) => {
        let resume_url = null;

        if (file_uploads) {
          resume_url = await generateSignedUrl(file_uploads.file_path);
        }

        return {
          ...rest,
          user_profile: users.user_profiles,
          resume_url,
        };
      })
    );

    return successResponse(res, 'Applications fetched successfully', result);
  } catch (err) {
    console.error('Get Job Applications Error:', err);
    return errorResponse(res, 'Failed to fetch applications', [err.message], 500);
  }
};

exports.getApplicationById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const application = await prisma.job_applications.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            user_profiles: true,
          },
        },
        job_posts: true,
        file_uploads: true,
        application_status_history: true,
      },
    });

    if (!application) {
      return errorResponse(res, 'Application not found', [], 404);
    }

    if (user.role === 'candidate' && application.candidate_id !== user.id) {
      return errorResponse(res, 'You are not authorized to view this application', [], 403);
    }

    if (user.role === 'company' && application.job_posts.created_by !== user.id) {
      return errorResponse(res, 'You are not authorized to view this application', [], 403);
    }

    const resume_url = application.file_uploads
      ? await generateSignedUrl(application.file_uploads.file_path)
      : null;

    const result = {
      id: application.id,
      job_id: application.job_id,
      candidate_id: application.candidate_id,
      cover_letter: application.cover_letter,
      status: application.status,
      notes: application.notes,
      applied_at: application.applied_at,
      updated_at: application.updated_at,
      user_profile: application.users.user_profiles,
      resume_url,
      application_status_history: application.application_status_history,
    };

    return successResponse(res, 'Application detail retrieved', result);
  } catch (error) {
    console.error('Get Application By Id Error:', error);
    return errorResponse(res, 'Failed to get application detail', [error.message], 500);
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { newStatus, notes} = req.body;

  if (!newStatus) {
    return errorResponse(res, 'newStatus is required', []);
  }

  try {
    const application = await prisma.job_applications.findUnique({ 
      where: { id },
      include: {
        job_posts: true,
      },
    });

    if (!application) {
      return errorResponse(res, 'Application not found', [], 404);
    }

    if (application.job_posts.created_by !== user.id) {
      return errorResponse(res, 'You are not authorized to update this application status', [], 403);
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
        changed_by: user.id,
        created_at: new Date(),
      },
    });

    return successResponse(res, 'Application status updated successfully');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to update application status', [error.message], 500);
  }
};
