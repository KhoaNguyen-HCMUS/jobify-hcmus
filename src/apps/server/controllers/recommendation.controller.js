const prisma = require('../prisma/client');
const { successResponse, errorResponse } = require('../utils/response');

// Education level mapping for Vietnamese/English
const EDUCATION_MAPPING = {
  'trung học': ['high school', 'secondary', 'trung học', 'thpt'],
  'trung cấp': ['vocational', 'technical', 'trung cấp', 'certificate'],
  'cao đẳng': ['associate', 'college', 'diploma', 'cao đẳng'],
  'cử nhân': ['bachelor', 'cử nhân', 'đại học', 'undergraduate', 'university'],
  'thạc sĩ': ['master', 'thạc sĩ', 'graduate', 'postgraduate', 'mba'],
  'tiến sĩ': ['phd', 'doctorate', 'tiến sĩ', 'doctoral'],
  'giáo sư': ['professor', 'giáo sư']
};

// Get education level from string
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

// Check if user meets education requirement
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

const normalizeListString = (str) => {
  if (!str) return [];
  return str.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
};

exports.generateJobMatchesForUser = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log(`🚀 Starting job matching for user: ${userId}`);
    
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
      where: { status: 'active' },
      select: {
        id: true,
        title: true,
        description: true,
        skills: true,
        industry_id: true,
        education_level: true,
        experience_level: true,
        province: true,
        industries: {
          select: {
            name: true
          }
        }
      }
    });

    const userSkills = normalizeListString(userProfile.skills);
    const userIndustries = normalizeListString(userProfile.industry);

    // Extract user education levels using mapping system
    const userDegrees = userProfile.educations
      .map(e => getEducationLevel(e.degree))
      .filter(level => level !== null);
    
    const userFields = userProfile.educations
      .map(e => e.field_of_study?.toLowerCase())
      .filter(field => field && field.length >= 3); // Filter out short/invalid entries
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

    const SCORING_WEIGHTS = {
      LOCATION_MAX: 30,     // Highest priority
      INDUSTRY_MAX: 25,     // Second priority  
      EXPERIENCE_MAX: 20,   // Tied third priority
      EDUCATION_MAX: 20,    // Tied third priority
      SKILL_PER_MATCH: 2,   // 2 points per skill (max ~10-15 skills)
      FIELD_BONUS: 5        // Bonus for field expertise
    };

    for (const job of allJobs) {
      let score = 0;
      const reasons = [];
      const debugScores = { jobId: job.id, jobTitle: job.title };

      // 1. Skill Matching
      const jobSkills = normalizeListString(job.skills);
      const commonSkills = jobSkills.filter(skill => userSkills.includes(skill));
      const skillScore = commonSkills.length * SCORING_WEIGHTS.SKILL_PER_MATCH;
      debugScores.skillScore = skillScore;
      debugScores.commonSkills = commonSkills;
      debugScores.jobSkills = jobSkills;
      debugScores.userSkills = userSkills;
      if (commonSkills.length) {
        score += skillScore;
        reasons.push(`Matched skills: ${commonSkills.join(', ')}`);
      }

      // 2. Industry Matching
      const industryName = job.industries?.name?.toLowerCase();
      const industryScore = (industryName && userIndustries.includes(industryName)) ? SCORING_WEIGHTS.INDUSTRY_MAX : 0;
      debugScores.industryScore = industryScore;
      debugScores.matchedIndustry = industryName;
      debugScores.userIndustries = userIndustries;
      if (industryScore > 0) {
        score += industryScore;
        reasons.push(`Matched industry: ${industryName}`);
      }

      // 3. Education Level Matching
      let educationScore = 0;
      if (job.education_level) {
        educationScore = meetsEducationRequirement(userDegrees, job.education_level) * SCORING_WEIGHTS.EDUCATION_MAX;
        if (educationScore > 0) {
          score += educationScore;
          reasons.push(`Meets education requirement: ${job.education_level}`);
        }
      }
      debugScores.educationScore = educationScore;
      debugScores.jobEducationLevel = job.education_level;
      debugScores.userEducationLevels = userDegrees;

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
          fieldScore = SCORING_WEIGHTS.FIELD_BONUS;
          score += fieldScore;
          reasons.push(`Matched field expertise: ${matchedFields.join(', ')}`);
        }
      }
      debugScores.fieldScore = fieldScore;
      debugScores.matchedFields = matchedFields;
      debugScores.userFields = userFields;

      // 5. Experience Matching
      let experienceScore = 0;
      let matchedExp = [];
      if (job.title) {
        const jobTitle = job.title.toLowerCase();
        matchedExp = userJobTitles.filter(userTitle => {
          if (userTitle.length < 3) return false; // Skip very short titles
          // More precise matching: require significant overlap
          const shorterLength = Math.min(userTitle.length, jobTitle.length);
          const longerLength = Math.max(userTitle.length, jobTitle.length);
          
          // Avoid matching very short strings against long ones
          if (shorterLength < 4 && longerLength > 10) return false;
          
          return jobTitle.includes(userTitle) || userTitle.includes(jobTitle);
        });
        if (matchedExp.length) {
          experienceScore = SCORING_WEIGHTS.EXPERIENCE_MAX;
          score += experienceScore;
          reasons.push(`Matched experience: ${matchedExp.join(', ')}`);
        }
      }
      debugScores.experienceScore = experienceScore;
      debugScores.matchedExp = matchedExp;

      // 6. Location Matching 
      let locationScore = 0;
      const userProvince = userProfile.province?.toLowerCase();
      const jobProvince = job.province?.toLowerCase();
      if (userProvince && jobProvince) {
        if (userProvince === jobProvince) {
          locationScore = SCORING_WEIGHTS.LOCATION_MAX; 
          score += locationScore;
          reasons.push(`Matched location: ${job.province}`);
        } 
      }
      debugScores.locationScore = locationScore;
      debugScores.userProvince = userProvince;
      debugScores.jobProvince = jobProvince;

      debugScores.totalScore = score;

      // Debug logging (detailed)
      if (score >= 25) {
        console.log(`\n🎯 Job Match Found:`);
        console.log(`   Job: "${job.title}" (${job.id})`);
        console.log(`   Location: ${job.province || 'Not specified'}`);
        console.log(`   Total Score: ${score}/100`);
        console.log(`   Score Breakdown:`);
        console.log(`     ├── Location: ${locationScore}/${SCORING_WEIGHTS.LOCATION_MAX} (job: ${jobProvince || 'none'}, user: ${userProvince || 'none'})`);
        console.log(`     ├── Industry: ${industryScore}/${SCORING_WEIGHTS.INDUSTRY_MAX} (job: ${industryName || 'none'}, user: [${userIndustries.join(', ')}])`);
        console.log(`     ├── Experience: ${experienceScore}/${SCORING_WEIGHTS.EXPERIENCE_MAX} (matched: [${debugScores.matchedExp.join(', ')}])`);
        console.log(`     ├── Education: ${educationScore}/${SCORING_WEIGHTS.EDUCATION_MAX} (job: ${job.education_level || 'none'}, user: [${userDegrees.join(', ')}])`);
        console.log(`     ├── Skills: ${skillScore}/~20 (matched: [${debugScores.commonSkills.join(', ')}])`);
        console.log(`     └── Field: ${fieldScore}/${SCORING_WEIGHTS.FIELD_BONUS} (matched: [${debugScores.matchedFields.join(', ')}])`);
        console.log(`   Reasons: ${reasons.join('; ')}`);
      }

      // Only save if score meets minimum threshold
      const MIN_MATCH_SCORE = 0; 
      if (score > MIN_MATCH_SCORE) {
        matches.push({
          user_id: userId,
          job_id: job.id,
          match_score: score,
          match_reasons: reasons,
        });
      }
    }

    // Delete old matches for user and insert new ones in a transaction
    try {
      await prisma.$transaction(async (tx) => {
        await tx.job_matches.deleteMany({ 
          where: { user_id: userId } 
        });

        if (matches.length > 0) {
          await tx.job_matches.createMany({
            data: matches
          });
        }
      });

      console.log(`✅ Successfully saved ${matches.length} job matches for user ${userId}`);
    } catch (dbError) {
      console.error('❌ Database transaction failed:', dbError);
      throw new Error(`Failed to save job matches: ${dbError.message}`);
    }

    return successResponse(res, 'Job matches generated successfully', {
      totalMatches: matches.length,
      userId: userId
    });

  } catch (error) {
    console.error('Error generating job matches:', error);
    return errorResponse(res, 'Failed to generate job matches', [error.message], 500);
  }
};
