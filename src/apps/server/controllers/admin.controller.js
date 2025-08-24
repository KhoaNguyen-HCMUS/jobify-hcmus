const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getPendingCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const totalPendingCompanies = await prisma.companies.count({
      where: { status: 'pending' }
    });

    if (totalPendingCompanies === 0) {
      return successResponse(res, 'No pending companies found', [], {
        page,
        limit,
        totalPages: 0,
        hasNextPage: false
      });
    }

    const companies = await prisma.companies.findMany({
      where: { status: 'pending' },
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' }
    });

    const totalPages = Math.ceil(totalPendingCompanies / limit);
    const hasNextPage = page < totalPages;

    const paginationInfo = {
      page,
      limit,
      totalPages,
      hasNextPage
    };

    return successResponse(res, 'Pending companies fetched successfully', companies, paginationInfo);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch pending companies', [error.message], 500);
  }
};

exports.approveCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.companies.findUnique({ where: { id } });
    if (!company) return errorResponse(res, 'Company not found', [], 404);

    const updateCompanyPromise = prisma.companies.update({
      where: { id },
      data: {
        status: 'active',
        updated_at: new Date(),
      },
    });

    const restoreJobsPromise = prisma.job_posts.updateMany({
      where: {
        created_by: company.user_id,
        status: 'draft',
        prev_status: 'active',
      },
      data: {
        status: 'active',
        moderator_notes: null,
        updated_at: new Date(),
        prev_status: null, 
      },
    });

    await Promise.all([updateCompanyPromise, restoreJobsPromise]);

    return successResponse(res, 'Company approved successfully and job posts restored');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to approve company', [error.message], 500);
  }
};

exports.rejectCompany = async (req, res) => {
  const { id } = req.params;
  const { moderator_notes } = req.body;

  try {
    const company = await prisma.companies.findUnique({ where: { id } });
    if (!company) return errorResponse(res, 'Company not found', [], 404);

    const jobs = await prisma.job_posts.findMany({
      where: {
        created_by: company.user_id,
        status: { in: ['active', 'pending', 'draft'] },
      },
      select: { id: true, status: true }
    });

    const updateCompany = prisma.companies.update({
      where: { id },
      data: {
        status: 'rejected',
        moderator_notes,
        updated_at: new Date()
      }
    });

    const updateJobs = Promise.all(
      jobs.map(job =>
        prisma.job_posts.update({
          where: { id: job.id },
          data: {
            prev_status: job.status,
            status: 'expired',
            updated_at: new Date()
          }
        })
      )
    );

    await Promise.all([updateCompany, updateJobs]);

    return successResponse(res, 'Company rejected and job posts closed successfully');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to reject company', [error.message], 500);
  }
};

exports.getUsers = async (req, res) => {
  const { user } = req;

  try {
    const roleFilter = user.role === 'moderator'
      ? { role: { in: ['candidate', 'company'] } }
      : {};

    const users = await prisma.users.findMany({
      where: roleFilter,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      },
    });

    const result = await Promise.all(
      users.map(async (u) => {
        let profileName = null;

        if (u.role === 'candidate') {
          const profile = await prisma.user_profiles.findUnique({
            where: { user_id: u.id },
            select: { full_name: true },
          });
          profileName = profile ? profile.full_name : null;
        } else if (u.role === 'company') {
          const company = await prisma.companies.findUnique({
            where: { user_id: u.id },
            select: { company_name: true },
          });
          profileName = company ? company.company_name : null;
        }

        return {
          ...u,
          profileName,
        };
      })
    );

    return successResponse(res, 'Users fetched successfully', result);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch users', [error.message], 500);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const targetUser = await prisma.users.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!targetUser) {
      return errorResponse(res, 'User not found', [], 404);
    }

    if (user.role === 'moderator' && !['candidate', 'company'].includes(targetUser.role)) {
      return errorResponse(res, 'You are not authorized to view this user', [], 403);
    }

    let profile = null;
    if (targetUser.role === 'candidate') {
      profile = await prisma.user_profiles.findUnique({
        where: { user_id: id },
      });
    } else if (targetUser.role === 'company') {
      profile = await prisma.companies.findUnique({
        where: { user_id: id },
      });
    }

    if (!profile) {
      return errorResponse(res, 'Profile not found', [], 404);
    }

    return successResponse(res, 'Profile fetched successfully', profile);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch profile', [error.message], 500);
  }
};

exports.banUser = async (req, res) => {
  const { id } = req.params;
  const operatorId = req.user.id;
  const operatorRole = req.user.role;

  try {
    const user = await prisma.users.findUnique({ 
      where: { id },
      select: { id: true, role: true }
    });

    if (!user) {
      return errorResponse(res, 'User not found', [], 404);
    }

    if (operatorRole === 'moderator' && !['candidate', 'company'].includes(user.role)) {
      return errorResponse(res, 'You are not authorized to ban this user', [], 403);
    }

    await prisma.users.update({
      where: { id },
      data: {
        status: 'banned',
        banned_by: operatorId,
        banned_at: new Date(),
        updated_at: new Date(),
      },
    });

    return successResponse(res, 'User banned successfully');
  } catch (error) {
    console.error('Ban User Error:', error);
    return errorResponse(res, 'Failed to ban user', [error.message], 500);
  }
};

exports.unbanUser = async (req, res) => {
  const { id } = req.params;
  const operatorId = req.user.id;
  const operatorRole = req.user.role;

  try {
    const user = await prisma.users.findUnique({ 
      where: { id },
      select: { id: true, role: true }
    });

    if (!user) {
      return errorResponse(res, 'User not found', [], 404);
    }

    if (operatorRole === 'moderator' && !['candidate', 'company'].includes(user.role)) {
      return errorResponse(res, 'You are not authorized to unban this user', [], 403);
    }

    await prisma.users.update({
      where: { id },
      data: {
        status: 'active',
        banned_by: operatorId,
        banned_at: null,
        updated_at: new Date(),
      },
    });

    return successResponse(res, 'User unbanned successfully');
  } catch (error) {
    console.error('Unban User Error:', error);
    return errorResponse(res, 'Failed to unban user', [error.message], 500);
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await prisma.audit_logs.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: { role: true }
        }
      }
    });

    if (!logs || logs.length === 0) {
      return successResponse(res, 'No audit logs found');
    }

    return successResponse(res, 'Audit logs fetched successfully', logs);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch audit logs', [error.message], 500);
  }
}

exports.getAuditLogById = async (req, res) => {
  const { id } = req.params;

  try {
    const log = await prisma.audit_logs.findUnique({
      where: { id },
      include: {
        user: {
          select: { role: true }
        }
      }
    });

    if (!log) {
      return errorResponse(res, 'Audit log not found', [], 404);
    }

    let profileName = null;

    if (log.user.role === 'candidate') {
      const profile = await prisma.user_profiles.findUnique({
        where: { user_id: log.user.id },
        select: { full_name: true }
      });
      profileName = profile ? profile.full_name : null;
    } else if (log.user.role === 'company') {
      const company = await prisma.companies.findUnique({
        where: { user_id: log.user.id },
        select: { company_name: true }
      });
      profileName = company ? company.company_name : null;
    }

    const result = {
      ...log,
      user: {
        ...log.user,
        name: profileName,
      }
    };

    return successResponse(res, 'Audit log fetched successfully', result);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to fetch audit log', [error.message], 500);
  }
};
