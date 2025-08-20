const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

// ✅ Education level mapping for Vietnamese/English
const EDUCATION_MAPPING = {
  'trung học': ['high school', 'secondary', 'trung học', 'thpt'],
  'trung cấp': ['vocational', 'technical', 'trung cấp', 'certificate'],
  'cao đẳng': ['associate', 'college', 'diploma', 'cao đẳng'],
  'cử nhân': ['bachelor', 'cử nhân', 'đại học', 'undergraduate', 'university'],
  'thạc sĩ': ['master', 'thạc sĩ', 'graduate', 'postgraduate', 'mba'],
  'tiến sĩ': ['phd', 'doctorate', 'tiến sĩ', 'doctoral'],
  'giáo sư': ['professor', 'giáo sư']
};

// ✅ Get education level from string
function getEducationLevel(degreeStr) {
  if (!degreeStr || degreeStr.length < 3) return null;
  
  const normalized = degreeStr.toLowerCase().trim();
  
  for (const [level, keywords] of Object.entries(EDUCATION_MAPPING)) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return level;
    }
  }
  return null;
}

// ✅ Check if user meets education requirement
function meetsEducationRequirement(userEducationLevels, requiredEducation) {
  if (!requiredEducation || requiredEducation.length < 3) return 0.3; // Default score
  
  const requiredLevel = getEducationLevel(requiredEducation);
  if (!requiredLevel) return 0.3; // Unknown requirement
  
  // Education hierarchy (higher can substitute lower)
  const hierarchy = ['trung học', 'trung cấp', 'cao đẳng', 'cử nhân', 'thạc sĩ', 'tiến sĩ', 'giáo sư'];
  const requiredIndex = hierarchy.indexOf(requiredLevel);
  
  for (const userLevel of userEducationLevels) {
    const userIndex = hierarchy.indexOf(userLevel);
    if (userIndex >= requiredIndex) {
      return 1.0; // Exact or higher qualification
    }
  }
  
  return 0.1; // Doesn't meet requirement
}

// Helper function to normalize skills string (if not available in string utils)
const normalizeListString = (str) => {
  if (!str) return [];
  return str.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
};

exports.generateJobMatchesForUser = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log(`🚀 Starting job matching for user: ${userId}`);
    
    // Get user profile with related data
    const userProfile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
      include: {
        educations: true,
        experiences: true
      }
    });

    if (!userProfile) {
      console.log(`❌ No user profile found for user: ${userId}`);
      return errorResponse(res, 'User profile not found', [], 404);
    }

    console.log(`✅ User profile found. Skills: ${userProfile.skills}, Industry: ${userProfile.industry}`);
    console.log(`📚 Education records: ${userProfile.educations.length}, Experience records: ${userProfile.experiences.length}`);

    // Get active jobs with industry info
    const allJobs = await prisma.job_posts.findMany({
      where: { status: 'active' }, // ✅ Fixed field name
      select: {
        id: true,
        title: true,
        description: true,
        skills: true,
        industry_id: true,
        education_level: true, // Use this instead of required_degree
        experience_level: true,
        province: true, // ✅ Add province for location matching
        industries: {
          select: {
            name: true // ✅ Fixed field name
          }
        }
      }
    });

    const userSkills = normalizeListString(userProfile.skills);
    const userIndustries = normalizeListString(userProfile.industry);

    // ✅ Extract user education levels using mapping system
    const userDegrees = userProfile.educations
      .map(e => getEducationLevel(e.degree))
      .filter(level => level !== null);
    
    const userFields = userProfile.educations
      .map(e => e.field_of_study?.toLowerCase())
      .filter(field => field && field.length >= 3); // ✅ Filter out short/invalid entries
    const userJobTitles = userProfile.experiences.map(e => e.job_title?.toLowerCase()).filter(Boolean);

    console.log(`📚 User education levels: [${userDegrees.join(', ')}]`);

    console.log(`👤 User Data Summary:`);
    console.log(`  Skills: [${userSkills.join(', ')}]`);
    console.log(`  Industries: [${userIndustries.join(', ')}]`);
    console.log(`  Degrees: [${userDegrees.join(', ')}]`);
    console.log(`  Fields: [${userFields.join(', ')}]`);
    console.log(`  Job Titles: [${userJobTitles.join(', ')}]`);
    console.log(`  Province: ${userProfile.province || 'Not set'}`);
    console.log(`📊 Found ${allJobs.length} active jobs to match against`);

    const matches = [];

    for (const job of allJobs) {
      let score = 0;
      const reasons = [];
      const debugScores = { jobId: job.id, jobTitle: job.title }; // Debug object

      // 1. Skill Matching
      const jobSkills = normalizeListString(job.skills);
      const commonSkills = jobSkills.filter(skill => userSkills.includes(skill));
      const skillScore = commonSkills.length * 5;
      debugScores.skillScore = skillScore;
      debugScores.commonSkills = commonSkills;
      debugScores.jobSkills = jobSkills; // Debug: show job skills
      debugScores.userSkills = userSkills; // Debug: show user skills
      if (commonSkills.length) {
        score += skillScore;
        reasons.push(`Matched skills: ${commonSkills.join(', ')}`);
      }

      // 2. Industry Matching
      const industryName = job.industries?.name?.toLowerCase();
      const industryScore = (industryName && userIndustries.includes(industryName)) ? 10 : 0;
      debugScores.industryScore = industryScore;
      debugScores.matchedIndustry = industryName;
      debugScores.userIndustries = userIndustries; // Debug: show user industries
      if (industryScore > 0) {
        score += industryScore;
        reasons.push(`Matched industry: ${industryName}`);
      }

      // 3. Education Level Matching - ✅ Using proper mapping system
      let educationScore = 0;
      if (job.education_level) {
        educationScore = meetsEducationRequirement(userDegrees, job.education_level) * 7;
        if (educationScore > 0) {
          score += educationScore;
          reasons.push(`Meets education requirement: ${job.education_level}`);
        }
      }
      debugScores.educationScore = educationScore;
      debugScores.jobEducationLevel = job.education_level;
      debugScores.userEducationLevels = userDegrees; // ✅ Debug: show mapped education levels

      // 4. Field of Study Matching
      let fieldScore = 0;
      let matchedFields = [];
      if (job.description && userFields.length > 0) {
        const jobDescLower = job.description.toLowerCase();
        // Only match fields with at least 3 characters to avoid false positives
        matchedFields = userFields.filter(field => 
          field.length >= 3 && jobDescLower.includes(field)
        );
        if (matchedFields.length > 0) {
          fieldScore = 6;
          score += fieldScore;
          reasons.push(`Matched field expertise: ${matchedFields.join(', ')}`);
        }
      }
      debugScores.fieldScore = fieldScore;
      debugScores.matchedFields = matchedFields;
      debugScores.userFields = userFields; // Debug: show what user fields we have

      // 5. Experience Matching
      let experienceScore = 0;
      let matchedExp = [];
      if (job.title) {
        const jobTitle = job.title.toLowerCase();
        matchedExp = userJobTitles.filter(t => 
          jobTitle.includes(t) || t.includes(jobTitle)
        );
        if (matchedExp.length) {
          experienceScore = 8;
          score += experienceScore;
          reasons.push(`Matched experience: ${matchedExp.join(', ')}`);
        }
      }
      debugScores.experienceScore = experienceScore;
      debugScores.matchedExp = matchedExp;

      // 6. Location Matching (Province)
      let locationScore = 0;
      const userProvince = userProfile.province?.toLowerCase();
      const jobProvince = job.province?.toLowerCase();
      if (userProvince && jobProvince) {
        if (userProvince === jobProvince) {
          locationScore = 10; 
          score += locationScore;
          reasons.push(`Matched location: ${job.province}`);
        } 
      }
      debugScores.locationScore = locationScore;
      debugScores.userProvince = userProvince;
      debugScores.jobProvince = jobProvince;

      debugScores.totalScore = score;

      // Debug logging (detailed)
      if (score >= 15) {
        console.log(`\n🎯 Job Match Found:`);
        console.log(`   Job: "${job.title}" (${job.id})`);
        console.log(`   Location: ${job.province || 'Not specified'}`);
        console.log(`   Total Score: ${score}`);
        console.log(`   Score Breakdown:`);
        console.log(`     ├── Skills: ${skillScore} (matched: [${debugScores.commonSkills.join(', ')}])`);
        console.log(`     ├── Industry: ${industryScore} (job: ${industryName || 'none'}, user: [${userIndustries.join(', ')}])`);
        console.log(`     ├── Education: ${educationScore} (job: ${job.education_level || 'none'}, user: [${userDegrees.join(', ')}])`);
        console.log(`     ├── Field: ${fieldScore} (matched: [${debugScores.matchedFields.join(', ')}])`);
        console.log(`     ├── Experience: ${experienceScore} (matched: [${debugScores.matchedExp.join(', ')}])`);
        console.log(`     └── Location: ${locationScore} (job: ${jobProvince || 'none'}, user: ${userProvince || 'none'})`);
        console.log(`   Reasons: ${reasons.join('; ')}`);
      }

      // Only save if score meets minimum threshold
      const MIN_MATCH_SCORE = 15; // Minimum score for reasonable accuracy
      if (score >= MIN_MATCH_SCORE) {
        matches.push({
          user_id: userId,
          job_id: job.id,
          match_score: score,
          match_reasons: reasons,
        });
      }
    }

    // Delete old matches for user and insert new ones in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete old matches
      await tx.job_matches.deleteMany({ 
        where: { user_id: userId } 
      });

      // Insert new matches in batch (more efficient)
      if (matches.length > 0) {
        await tx.job_matches.createMany({
          data: matches
        });
      }
    });

    return successResponse(res, 'Job matches generated successfully', {
      totalMatches: matches.length,
      userId: userId
    });

  } catch (error) {
    console.error('Error generating job matches:', error);
    return errorResponse(res, 'Failed to generate job matches', [error.message], 500);
  }
};
