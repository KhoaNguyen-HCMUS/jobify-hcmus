const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job_posts.findMany();
    return successResponse(res, 'Jobs fetched successfully', jobs);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch jobs', [err.message], 500);
  }
};

exports.getJobDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.job_posts.findUnique({ where: { id } });
    if (!job) return errorResponse(res, 'Job not found', [], 404);
    return successResponse(res, 'Job detail fetched successfully', job);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch job detail', [err.message], 500);
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = await prisma.job_posts.create({ data: req.body });
    return successResponse(res, 'Job created successfully', newJob, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to create job', [err.message], 500);
  }
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJob = await prisma.job_posts.update({
      where: { id },
      data: req.body,
    });
    return successResponse(res, 'Job updated successfully', updatedJob);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to update job', [err.message], 500);
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.job_posts.delete({ where: { id } });
    return successResponse(res, 'Job deleted successfully');
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to delete job', [err.message], 500);
  }
};

exports.saveJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;

  try {
    await prisma.saved_jobs.create({
      data: { user_id: userId, job_id: jobId },
    });
    return successResponse(res, 'Job saved successfully');
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to save job', [err.message], 500);
  }
};

exports.unsaveJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;

  try {
    await prisma.saved_jobs.deleteMany({
      where: { user_id: userId, job_id: jobId },
    });
    return successResponse(res, 'Job unsaved successfully');
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to unsave job', [err.message], 500);
  }
};

exports.getSavedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    const savedJobs = await prisma.saved_jobs.findMany({
      where: { user_id: userId },
      include: {
        job_posts: {
          include: {
            companies: true,
            job_categories: true,
          },
        },
      },
    });
    return successResponse(res, 'Saved jobs fetched successfully', savedJobs);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch saved jobs', [err.message], 500);
  }
};

exports.getRecommendedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    const recommendedJobs = await prisma.job_matches.findMany({
      where: { user_id: userId, is_dismissed: false },
      orderBy: { match_score: 'desc' },
      include: {
        job_posts: {
          include: {
            companies: true,
            job_categories: true,
          },
        },
      },
    });
    return successResponse(res, 'Recommended jobs fetched successfully', recommendedJobs);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch recommended jobs', [err.message], 500);
  }
};
