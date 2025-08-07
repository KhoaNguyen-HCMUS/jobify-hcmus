export const EXPERIENCE_LEVELS = [
  "Intern",
  "Fresher", 
  "Junior",
  "Mid-level",
  "Senior",
  "Leader",
  "Manager",
  "Director"
] as const;

export const EDUCATION_LEVELS = [
  "High School",
  "College",
  "University",
  "Master",
  "PhD"
] as const;

export const JOB_TYPES = [
  "Full-time",
  "Part-time"
] as const;

export const CURRENCIES = [
  "VND",
  "USD",
  "EUR"
] as const;

export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type EducationLevel = typeof EDUCATION_LEVELS[number];
export type JobType = typeof JOB_TYPES[number];
export type Currency = typeof CURRENCIES[number]; 