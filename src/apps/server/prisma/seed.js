import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a user
  const user = await prisma.users.create({
    data: {
      email: 'testuser@example.com',
      password_hash: 'hashed_password_here',
      role: 'job_seeker',
      status: 'active',
      email_verified: true,
    },
  })

  console.log('Created user:', user)

  // Create a company
  const company = await prisma.companies.create({
    data: {
      name: 'Example Corp',
      description: 'A sample company for job postings.',
      industry: 'Software',
      size: '50-100',
      website: 'https://example.com',
      status: 'active',
      created_by: user.id, // FK to user
    },
  })

  console.log('Created company:', company)

  // Create a job category
  const category = await prisma.job_categories.create({
    data: {
      name: 'Software Engineering',
      description: 'All software engineering jobs',
    },
  })

  console.log('Created job category:', category)

  // Create a job post
  const jobPost = await prisma.job_posts.create({
    data: {
      company_id: company.id,
      title: 'Full Stack Developer',
      description: 'We need a passionate full stack dev.',
      job_type: 'Full-time',
      employment_type: 'Permanent',
      experience_level: 'Mid',
      location: 'Remote',
      salary_min: 1000,
      salary_max: 2000,
      currency: 'USD',
      category_id: category.id,
      created_by: user.id,
      status: 'open',
    },
  })

  console.log('Created job post:', jobPost)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
