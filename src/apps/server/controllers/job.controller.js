const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job_posts.findMany({ where: { status: 'active' } });
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
    const user = req.user;
    const company = await prisma.companies.findUnique({ where: { user_id: user.id }, });

    if (!company) {
      return errorResponse(res, 'Company not found', ['Company profile does not exist'], 404);
    }

    if (company.status !== 'active') {
      return errorResponse(res, 'You cannot post jobs while your company profile is not active', [], 403);
    }

    const {
      title,
      province,
      ward,
      work_place,
      salary_min,
      salary_max,
      is_salary_negotiable,
      experience_level,
      position,
      education_level,
      job_type,
      number_of_openings,
      deadline,
      working_hours,
      description,
      requirements,
      responsibilities,
      benefits,
      industry_id,
      skills,
      currency,
      cost_coin,
    } = req.body;

    const parsedDeadline = deadline ? new Date(deadline) : null;

    const newJob = await prisma.job_posts.create({
      data: {
        company_id: company.id,
        created_by: user.id,
        title,
        province,
        ward,
        work_place,
        salary_min,
        salary_max,
        is_salary_negotiable,
        experience_level,
        position,
        education_level,
        job_type,
        number_of_openings,
        deadline: parsedDeadline,
        working_hours,
        description,
        requirements,
        responsibilities,
        benefits,
        industry_id,
        skills,
        currency,
        cost_coin,
        status: 'pending',          
      },
    });

    return successResponse(res, 'Job created successfully', newJob, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to create job', [err.message], 500);
  }
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const existingJob = await prisma.job_posts.findUnique({ where: { id } });
    if (!existingJob) {
      return errorResponse(res, 'Job not found', [], 404);
    }

    if (user.role === 'company') {
      const company = await prisma.companies.findUnique({ where: { user_id: user.id }, });

      if (!company || company.id !== existingJob.company_id) {
        return errorResponse(res, 'You are not authorized to update this job post', [], 403);
      }
    }

    const {
      title,
      province,
      ward,
      work_place,
      salary_min,
      salary_max,
      is_salary_negotiable,
      experience_level,
      position,
      education_level,
      job_type,
      number_of_openings,
      deadline,
      working_hours,
      description,
      requirements,
      responsibilities,
      benefits,
      industry_id,
      skills,
      currency,
      cost_coin,
      status,
      moderator_notes,
    } = req.body;

    const parsedDeadline = deadline ? new Date(deadline) : undefined;

    const updatedJob = await prisma.job_posts.update({
      where: { id },
      data: {
        title,
        province,
        ward,
        work_place,
        salary_min,
        salary_max,
        is_salary_negotiable,
        experience_level,
        position,
        education_level,
        job_type,
        number_of_openings,
        deadline: parsedDeadline,
        working_hours,
        description,
        requirements,
        responsibilities,
        benefits,
        industry_id,
        skills,
        currency,
        cost_coin,
        status,
        moderator_notes,
        updated_at: new Date(),
      },
    });

    return successResponse(res, 'Job updated successfully', updatedJob);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to update job', [err.message], 500);
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const job = await prisma.job_posts.findUnique({ where: { id } });
    if (!job) {
      return errorResponse(res, 'Job not found', [], 404);
    }

    if (user.role === 'company') {
      const company = await prisma.companies.findUnique({
        where: { user_id: user.id },
      });

      if (!company || job.company_id !== company.id) {
        return errorResponse(res, 'You are not authorized to delete this job', [], 403);
      }
    }

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
    const job = await prisma.job_posts.findUnique({ where: { id: jobId, status: 'active' } });
    if (!job) {
      return errorResponse(res, 'Job not found', [], 404);
    }

    const existingSaved = await prisma.saved_jobs.findFirst({
      where: {
        user_id: userId,
        job_id: jobId
      }
    });

    if (existingSaved) {
      return errorResponse(res, 'You already saved this job');
    }

    await prisma.saved_jobs.create({
      data: {
        user_id: userId,
        job_id: jobId
      }
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
    const saved = await prisma.saved_jobs.findFirst({
      where: {
        user_id: userId,
        job_id: jobId
      }
    });

    if (!saved) {
      return errorResponse(res, 'Saved job not found', [], 404);
    }

    await prisma.saved_jobs.delete({
      where: { id: saved.id },
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
    const savedJobIds = await prisma.saved_jobs.findMany({ where: { user_id: userId }, select: { job_id: true } });

    const jobIds = savedJobIds.map(item => item.job_id);

    const jobs = await prisma.job_posts.findMany({ where: { id: { in: jobIds } } });

    return successResponse(res, 'Saved jobs fetched successfully', jobs);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch saved jobs', [err.message], 500);
  }
};

exports.getRecommendedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    // Lấy danh sách job_id từ bảng job_matches
    const matchedJobIds = await prisma.job_matches.findMany({
      where: { user_id: userId, is_dismissed: false },
      orderBy: { match_score: 'desc' },
      select: { job_id: true },
    });

    const jobIds = matchedJobIds.map(item => item.job_id);

    // Truy vấn full thông tin job_posts tương ứng
    const jobs = await prisma.job_posts.findMany({
      where: { id: { in: jobIds } },
      include: {
        companies: true,
        job_categories: true,
        job_skills: {
          include: {
            skills: true,
          },
        },
      },
    });

    return successResponse(res, 'Recommended jobs fetched successfully', jobs);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch recommended jobs', [err.message], 500);
  }
};

exports.getIndustry = async (req, res) => {
  const { name, parent_id } = req.body;

  try {
    if (!name) {
      return errorResponse(res, 'Industry name is required', [], 400);
    }

    const existingIndustry = await prisma.job_categories.findUnique({
      where: { name },
    });

    if (existingIndustry) {
      return successResponse(res, 'Industry found', existingIndustry.id);
    }

    const newIndustry = await prisma.job_categories.create({
      data: { name, parent_id: parent_id || null },
    });

    return successResponse(res, 'Industry created successfully', newIndustry.id, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to create industry', [err.message], 500);
  }
}