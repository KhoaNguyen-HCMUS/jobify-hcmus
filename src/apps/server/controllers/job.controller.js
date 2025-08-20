const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const userId = req.user ? req.user.id : null;

    const { 
      exp, 
      edu, 
      type, 
      salary, 
      location,
      industry,
      keyword
    } = req.query;

    const whereClause = { status: 'active' };

    if (exp) {
      const validExperienceLevels = ["Intern", "Fresher", "Junior", "Mid-level", "Senior", "Leader", "Manager", "Director"];
      if (validExperienceLevels.includes(exp)) {
        whereClause.experience_level = exp;
      }
    }

    if (edu) {
      const validEducationLevels = ["High School", "College", "University", "Master", "PhD"];
      if (validEducationLevels.includes(edu)) {
        whereClause.education_level = edu;
      }
    }

    if (type) {
      const validJobTypes = ["Full-time", "Part-time"];
      if (validJobTypes.includes(type)) {
        whereClause.job_type = type;
      }
    }

    if (salary) {
      const salaryParts = salary.split('-');
      if (salaryParts.length === 2) {
        const minSalaryMillion = parseFloat(salaryParts[0]);
        const maxSalaryMillion = parseFloat(salaryParts[1]);
        
        if (!isNaN(minSalaryMillion) && !isNaN(maxSalaryMillion) && minSalaryMillion >= 0 && maxSalaryMillion >= 0) {
          const minSalary = minSalaryMillion * 1000000;
          const maxSalary = maxSalaryMillion * 1000000;
          
          whereClause.AND = [
            { salary_max: { gt: minSalary } }, // Job's max salary > requested min
            { salary_min: { lt: maxSalary } }  // Job's min salary < requested max
          ];
        }
      }
    }

    if (location) {
      whereClause.province = {
        contains: location,
        mode: 'insensitive'
      };
    }

    if (industry) {
      whereClause.industry_id = industry;
    }

    if (keyword) {
      whereClause.OR = [
        {
          title: {
            contains: keyword,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: keyword,
            mode: 'insensitive'
          }
        }
      ];
    }

    const totalJobs = await prisma.job_posts.count({ 
      where: whereClause 
    });

    const jobs = await prisma.job_posts.findMany({ 
      where: whereClause,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' } 
    });

    if (jobs.length === 0) {
      return successResponse(res, 'No active jobs found', [], {
        page,
        limit,
        totalPages: Math.ceil(totalJobs / limit),
        hasNextPage: false
      });
    }

    let savedJobIds = [];
    let appliedJobIds = [];
    
    if (userId) {
      const [savedJobs, appliedJobs] = await Promise.all([
        prisma.saved_jobs.findMany({
          where: { user_id: userId },
          select: { job_id: true }
        }),
        prisma.job_applications.findMany({
          where: { candidate_id: userId },
          select: { job_id: true }
        })
      ]);
      
      savedJobIds = savedJobs.map(item => item.job_id);
      appliedJobIds = appliedJobs.map(item => item.job_id);
    }

    const jobsWithCompany = await Promise.all(jobs.map(async (job) => {
      const company = await prisma.companies.findUnique({ 
        where: { id: job.company_id }, 
        select: { company_name: true } 
      });
      
      return { 
        ...job, 
        company_name: company ? company.company_name : 'Unknown',
        is_saved: userId ? savedJobIds.includes(job.id) : false,
        is_applied: userId ? appliedJobIds.includes(job.id) : false
      };
    }));

    const totalPages = Math.ceil(totalJobs / limit);
    const hasNextPage = page < totalPages;

    const paginationInfo = {
      page,
      limit,
      totalPages,
      hasNextPage
    };

    return successResponse(res, 'Jobs fetched successfully', jobsWithCompany, paginationInfo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch jobs', [err.message], 500);
  }
};

exports.getCompanyJobs = async (req, res) => {
  const userId = req.user.id;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const company = await prisma.companies.findUnique({ where: { user_id: userId } });
    if (!company) { 
      return errorResponse(res, 'Company not found', [], 404);
    }

    const totalJobs = await prisma.job_posts.count({ 
      where: { company_id: company.id } 
    });

    const jobs = await prisma.job_posts.findMany({ 
      where: { company_id: company.id },
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' }
    });

    if (jobs.length === 0) {
      return successResponse(res, 'No company jobs found', [], {
        page,
        limit,
        totalPages: Math.ceil(totalJobs / limit),
        hasNextPage: false
      });
    }

    const totalPages = Math.ceil(totalJobs / limit);
    const hasNextPage = page < totalPages;

    const paginationInfo = {
      page,
      limit,
      totalPages,
      hasNextPage
    };

    return successResponse(res, 'Company jobs fetched successfully', jobs, paginationInfo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch company jobs', [err.message], 500);
  }
};

exports.getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.job_posts.findUnique({ where: { id } });
    if (!job) return errorResponse(res, 'Job not found', [], 404);

    const company = await prisma.companies.findUnique({ where: { id: job.company_id } });
    if (!company) return errorResponse(res, 'Company not found', [], 404);

    return successResponse(res, 'Job detail fetched successfully', { company, job });
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch job detail', [err.message], 500);
  }
};

exports.createJob = async (req, res) => {
  const { user } = req;
  try {
    const { status, deadline, scheduled_at, ...jobData } = req.body;
    
    if (!status || !['draft', 'schedule', 'active'].includes(status)) {
      return errorResponse(res, 'Invalid job status', [], 400);
    }

    if (status === 'schedule') {
      if (!scheduled_at) {
        return errorResponse(res, 'scheduled_at is required when status is schedule', [], 400);
      }

      const scheduledDate = new Date(scheduled_at);
      if (scheduledDate <= new Date()) {
        return errorResponse(res, 'scheduled_at must be in the future', [], 400);
      }
    }

    const company = await prisma.companies.findUnique({ where: { user_id: user.id } });
    if (!company) {
      return errorResponse(res, 'Company not found', ['Company profile does not exist'], 404);
    }

    if (company.status !== 'active' && status !== 'draft') {
      return errorResponse(res, 'You cannot post jobs while your company profile is not active, draft jobs are allowed', [], 403);
    }

    const newJob = await prisma.job_posts.create({
      data: {
        ...jobData,
        company_id: company.id,
        created_by: user.id,
        deadline: deadline ? new Date(deadline) : null,
        scheduled_at: status === 'schedule' ? new Date(scheduled_at) : null,
        status
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
  const { user } = req;

  try {
    const existingJob = await prisma.job_posts.findUnique({ where: { id } });
    if (!existingJob) {
      return errorResponse(res, 'Job not found', [], 404);
    }

    if (user.role === 'company') {
      const company = await prisma.companies.findUnique({ where: { user_id: user.id } });
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
      moderator_notes,
      status,
      scheduled_at,
    } = req.body;

    if (!status || !['draft', 'schedule', 'active', 'expired'].includes(status)) {
      return errorResponse(res, 'Invalid job status', [], 400);
    }

    if (status === 'schedule') {
      if (!scheduled_at) {
        return errorResponse(res, 'scheduled_at is required when status is schedule', [], 400);
      }
      
      const scheduledDate = new Date(scheduled_at);
      if (scheduledDate <= new Date()) {
        return errorResponse(res, 'scheduled_at must be in the future', [], 400);
      }
    }

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
        deadline: deadline ? new Date(deadline) : undefined,
        working_hours,
        description,
        requirements,
        responsibilities,
        benefits,
        industry_id,
        skills,
        currency,
        cost_coin,
        moderator_notes,
        scheduled_at: status === 'schedule' ? new Date(scheduled_at) : null,
        prev_status: existingJob.status,
        status,
        updated_at: new Date(),
      },
    });

    return successResponse(res, 'Job updated successfully', updatedJob);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to update job', [err.message], 500);
  }
};

exports.closeJob = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const job = await prisma.job_posts.findUnique({ where: { id } });

    if (!job) {
      return errorResponse(res, 'Job not found', [], 404);
    }
    if (user.role === 'company') {
      const company = await prisma.companies.findUnique({ where: { user_id: user.id } });

      if (!company || job.company_id !== company.id) {
        return errorResponse(res, 'You are not authorized to close this job', [], 403);
      }
    }
    await prisma.job_posts.update({
      where: { id },  
      data: {
        status: 'expired',
        updated_at: new Date(),
      },
    }); 
    return successResponse(res, 'Job closed successfully');
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to close job', [err.message], 500);
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
      const company = await prisma.companies.findUnique({ where: { user_id: user.id } });

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
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const offset = (page - 1) * limit;

    const totalSavedJobs = await prisma.saved_jobs.count({ 
      where: { user_id: userId } 
    });

    if (totalSavedJobs === 0) {
      return successResponse(res, 'No saved jobs found', [], {
        page,
        limit,
        totalPages: 0,
        hasNextPage: false
      });
    }

    const savedJobIds = await prisma.saved_jobs.findMany({ 
      where: { user_id: userId }, 
      select: { job_id: true },
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' }
    });

    const jobIds = savedJobIds.map(item => item.job_id);

    const jobs = await prisma.job_posts.findMany({ where: { id: { in: jobIds } } });

    const jobsWithCompany = await Promise.all(jobs.map(async (job) => {
      const company = await prisma.companies.findUnique({ where: { id: job.company_id }, select: { company_name: true } });
      return { ...job, company_name: company ? company.company_name : 'Unknown' };
    }));

    const totalPages = Math.ceil(totalSavedJobs / limit);
    const hasNextPage = page < totalPages;

    const paginationInfo = {
      page,
      limit,
      totalPages,
      hasNextPage
    };

    return successResponse(res, 'Saved jobs fetched successfully', jobsWithCompany, paginationInfo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch saved jobs', [err.message], 500);
  }
};

exports.getRecommendedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const totalRecommendedJobs = await prisma.job_matches.count({
      where: { user_id: userId, is_dismissed: false }
    });

    if (totalRecommendedJobs === 0) {
      return successResponse(res, 'No recommended jobs found', [], {
        page,
        limit,
        totalPages: 0,
        hasNextPage: false
      });
    }

    const matchedJobIds = await prisma.job_matches.findMany({
      where: { user_id: userId, is_dismissed: false },
      orderBy: { match_score: 'desc' },
      select: { 
        job_id: true,
        match_score: true
      },
      skip: offset,
      take: limit,
    });

    const jobIds = matchedJobIds.map(item => item.job_id);

    const jobs = await prisma.job_posts.findMany({ where: { id: { in: jobIds } } });

    const jobsWithCompany = await Promise.all(jobs.map(async (job) => {
      const company = await prisma.companies.findUnique({ where: { id: job.company_id }, select: { company_name: true } });
      
      const matchData = matchedJobIds.find(match => match.job_id === job.id);
      
      return { 
        ...job, 
        company_name: company ? company.company_name : 'Unknown',
        match_score: matchData ? matchData.match_score : 0
      };
    }));

    const sortedJobsWithCompany = jobsWithCompany.sort((a, b) => b.match_score - a.match_score);

    const totalPages = Math.ceil(totalRecommendedJobs / limit);
    const hasNextPage = page < totalPages;

    const paginationInfo = {
      page,
      limit,
      totalPages,
      hasNextPage
    };

    return successResponse(res, 'Recommended jobs fetched successfully', sortedJobsWithCompany, paginationInfo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch recommended jobs', [err.message], 500);
  }
};

exports.getAppliedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const totalAppliedJobs = await prisma.job_applications.count({
      where: { candidate_id: userId }
    });

    if (totalAppliedJobs === 0) {
      return successResponse(res, 'No applied jobs found', [], {
        page,
        limit,
        totalPages: 0,
        hasNextPage: false
      });
    }

    const applications = await prisma.job_applications.findMany({
      where: { candidate_id: userId },
      select: {
        id: true,         
        status: true,
        applied_at: true,
        job_posts: {
          select: {
            id: true,
            title: true,
            companies: {
              select: { company_name: true },
            },
            province: true,
            ward: true,
            work_place: true,
            salary_min: true,
            salary_max: true,
            is_salary_negotiable: true,
            currency: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: { applied_at: 'desc' }
    });

    const result = applications.map(app => {
      const job = app.job_posts;

      return {
        application_id: app.id,
        status: app.status,
        applied_at: app.created_at,
        id: job.id,
        title: job.title,
        province: job.province,
        ward: job.ward,
        work_place: job.work_place,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        is_salary_negotiable: job.is_salary_negotiable,
        currency: job.currency,
        company_name: job.companies.company_name,
      };
    });

    const totalPages = Math.ceil(totalAppliedJobs / limit);
    const hasNextPage = page < totalPages;

    const paginationInfo = {
      page,
      limit,
      totalPages,
      hasNextPage
    };

    return successResponse(res, 'Applied jobs fetched successfully', result, paginationInfo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch applied jobs', [err.message], 500);
  }
};

exports.getIndustry = async (req, res) => {
  try {
    const industries = await prisma.industries.findMany();

    return successResponse(res, 'Industries fetched successfully', industries);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch industries', [err.message], 500);
  }
};

exports.getIndustryById = async (req, res) => {
  const { id } = req.params;
  try {
    const industry = await prisma.industries.findUnique({ where: { id } });

    if (!industry) {
      return errorResponse(res, 'Industry not found', [], 404);
    }

    return successResponse(res, 'Industry fetched successfully', industry);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to fetch industry', [err.message], 500);
  }
};

exports.createIndustry = async (req, res) => {
  const { name, parent_id } = req.body;

  try {
    const existingIndustry = await prisma.industries.findUnique({ where: { name } });

    if (existingIndustry) {
      return errorResponse(res, 'Industry already exists', [], 400);
    }

    const newIndustry = await prisma.industries.create({ data: { name, parent_id: parent_id || null } });

    return successResponse(res, 'Industry created successfully', newIndustry, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Failed to create industry', [err.message], 500);
  }
};

exports.refreshJobs = async (req, res) => {
  try {
    const now = new Date();
    
    const jobsToActivate = await prisma.job_posts.findMany({
      where: {
        status: 'schedule',
        scheduled_at: {
          lte: now
        }
      }
    });

    const jobsToExpire = await prisma.job_posts.findMany({
      where: {
        status: 'active',
        deadline: {
          lt: now
        }
      }
    });

    if (jobsToActivate.length === 0 && jobsToExpire.length === 0) {
      return successResponse(res, 'No jobs found to update', {
        activatedCount: 0,
        expiredCount: 0,
        checkedAt: now.toISOString()
      });
    }

    const results = await prisma.$transaction(async (tx) => {
      let activatedCount = 0;
      let expiredCount = 0;

      if (jobsToActivate.length > 0) {
        const activateResult = await tx.job_posts.updateMany({
          where: {
            status: 'schedule',
            scheduled_at: {
              lte: now
            }
          },
          data: {
            prev_status: 'schedule',
            status: 'active',
            updated_at: now
          }
        });
        activatedCount = activateResult.count;
      }

      if (jobsToExpire.length > 0) {
        const expireResult = await tx.job_posts.updateMany({
          where: {
            status: 'active',
            deadline: {
              lt: now
            }
          },
          data: {
            prev_status: 'active',
            status: 'expired',
            updated_at: now
          }
        });
        expiredCount = expireResult.count;
      }

      return { activatedCount, expiredCount };
    });

    const message = [];
    if (results.activatedCount > 0) {
      message.push(`activated ${results.activatedCount} scheduled job(s)`);
    }
    if (results.expiredCount > 0) {
      message.push(`expired ${results.expiredCount} overdue job(s)`);
    }

    return successResponse(res, `Successfully ${message.join(' and ')}`, {
      checkedAt: now.toISOString()
    });

  } catch (error) {
    console.error('Error refreshing jobs:', error);
    return errorResponse(res, 'Failed to refresh jobs', [error.message], 500);
  }
};