const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

exports.getWallet = async (req, res) => {
  const recruiterId = req.user.id;

  try {
    const hrProfile = await prisma.hr_profiles.findFirst({
      where: { user_id: recruiterId },
      include: { companies: true }
    });

    if (!hrProfile) {
      return res.status(404).json(errorResponse('Company wallet not found', 404));
    }

    const wallet = await prisma.company_wallets.findUnique({
      where: { company_id: hrProfile.company_id }
    });

    res.json(successResponse(wallet, 'Wallet fetched successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch wallet'));
  }
};

exports.createTransaction = async (req, res) => {
  const recruiterId = req.user.id;
  const { amount, transaction_type, description } = req.body;

  try {
    const hrProfile = await prisma.hr_profiles.findFirst({
      where: { user_id: recruiterId },
    });

    if (!hrProfile) {
      return res.status(404).json(errorResponse('Company not found for recruiter', 404));
    }

    const companyId = hrProfile.company_id;

    await prisma.coin_transactions.create({
      data: {
        company_id: companyId,
        amount,
        transaction_type,
        description
      }
    });

    // Update balance
    await prisma.company_wallets.update({
      where: { company_id: companyId },
      data: {
        coin_balance: {
          increment: transaction_type === 'deposit' ? amount : -amount
        },
        updated_at: new Date()
      }
    });

    res.json(successResponse(null, 'Transaction completed successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to process transaction'));
  }
};

exports.getTransactions = async (req, res) => {
  const recruiterId = req.user.id;

  try {
    const hrProfile = await prisma.hr_profiles.findFirst({
      where: { user_id: recruiterId },
    });

    if (!hrProfile) {
      return res.status(404).json(errorResponse('Company not found for recruiter', 404));
    }

    const transactions = await prisma.coin_transactions.findMany({
      where: { company_id: hrProfile.company_id },
      orderBy: { created_at: 'desc' }
    });

    res.json(successResponse(transactions, 'Transaction history fetched successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse('Failed to fetch transactions'));
  }
};
