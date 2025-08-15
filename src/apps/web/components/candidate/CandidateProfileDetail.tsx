"use client";
import { Briefcase, User, Phone, GraduationCap } from "lucide-react";
import { Profile } from "../../services/candidateProfile";

interface CandidateProfileDetailProps {
  profile: Profile;
  showActions?: boolean;
  onDownloadResume?: () => void;
  onReport?: () => void;
  onUpdateStatus?: () => void;
}

export default function CandidateProfileDetail({
  profile,
  showActions = false,
  onDownloadResume,
  onReport,
  onUpdateStatus,
}: CandidateProfileDetailProps) {
  const skills = profile.skills
    ? profile.skills
        .split(",")
        .map((skill) => ({ skill: skill.trim() }))
        .filter((skill) => skill.skill)
    : [];

  return (
    <div className="bg-neutral-light-20">
      <div className="flex flex-col gap-y-4 mx-10">
        {/* Profile Header - Top Section */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex justify-center items-center">
            <div className="w-40 h-40 border border-primary-60 rounded-lg flex items-center justify-center">
              <img
                src={profile.profile_photo_url || "/avt.jpg"}
                alt={profile.full_name}
                className="w-40 h-40 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <User size={60} className="text-primary-60 hidden" />
            </div>
          </div>
          <div className="flex-4 flex flex-col">
            <div className="text-primary text-2xl font-bold">
              {profile.full_name}
            </div>
            <div className="flex flex-wrap">
              <div className="flex-1 flex flex-col text-primary-80">
                <span className="font-bold">{profile.industry}</span>
                <span>{profile.gender}</span>
                <span>{profile.email}</span>
                <span>{profile.phone}</span>
                <span>
                  {profile.address_detail}, {profile.ward}, {profile.province}
                </span>
              </div>
            </div>
            {onDownloadResume && (
              <div className="text-accent">
                <b>CV: </b>
                <button
                  onClick={onDownloadResume}
                  className="hover:text-secondary hover:underline"
                >
                  {profile.full_name}.pdf
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Introduction Section */}
        <div className="flex flex-col">
          <div className="flex gap-2 text-accent font-bold">
            <User size={24} />
            <span>INTRODUCTION</span>
          </div>
          <span className="text-primary-80 border-t border-primary-40">
            {profile.bio || "No bio available"}
          </span>
        </div>

        {/* Two Column Layout - Mid Section */}
        <div className="flex flex-wrap gap-8">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Contact Section */}
            <div className="flex flex-col">
              <div className="flex gap-2 text-accent font-bold">
                <Phone size={24} />
                <span>CONTACT</span>
              </div>
              <div className="flex flex-col text-primary font-bold border-t border-primary-40 pt-2">
                <span>
                  GitHub:{" "}
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-normal hover:text-secondary hover:underline"
                  >
                    {profile.github_url}
                  </a>
                </span>
                <span>
                  LinkedIn:{" "}
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-normal hover:text-secondary hover:underline"
                  >
                    {profile.linkedin_url}
                  </a>
                </span>
                <span>
                  Personal website:{" "}
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-normal hover:text-secondary hover:underline"
                  >
                    {profile.website}
                  </a>
                </span>
              </div>
            </div>

            {/* Work Experience Section */}
            {profile.experiences && profile.experiences.length > 0 && (
              <div className="flex flex-col">
                <div className="flex gap-2 text-accent font-bold">
                  <Briefcase size={24} />
                  <span>WORK EXPERIENCE</span>
                </div>
                <div className="flex flex-col border-t border-primary-40">
                  {profile.experiences.map((experience, idx) => (
                    <div key={idx} className="p-2">
                      <div className="font-bold text-primary">
                        {experience.job_title}
                      </div>
                      <div className="text-primary-80">
                        {experience.company_name}
                      </div>
                      <div className="text-primary-80 text-sm">
                        {experience.start_date
                          ? new Date(experience.start_date).toLocaleDateString()
                          : ""}{" "}
                        -{" "}
                        {experience.is_current
                          ? "Present"
                          : experience.end_date
                          ? new Date(experience.end_date).toLocaleDateString()
                          : ""}
                      </div>
                      <div className="text-primary-80 text-sm">
                        {experience.location}
                      </div>
                      <div className="text-primary-80 text-sm mt-1">
                        {experience.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Skills Section */}
            <div className="flex flex-col">
              <div className="flex gap-2 text-accent font-bold">
                <Briefcase size={24} />
                <span>SKILLS</span>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-primary-40 pt-2">
                {skills.length > 0 ? (
                  skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.skill}
                    </span>
                  ))
                ) : (
                  <span className="text-primary-60">No skills specified</span>
                )}
              </div>
            </div>

            {/* Education Section */}
            {profile.educations && profile.educations.length > 0 && (
              <div className="flex flex-col">
                <div className="flex gap-2 text-accent font-bold">
                  <GraduationCap size={24} />
                  <span>EDUCATION</span>
                </div>
                <div className="flex flex-col border-t border-primary-40">
                  {profile.educations.map((education, idx) => (
                    <div key={idx} className="p-2">
                      <div className="font-bold text-primary">
                        {education.degree} - {education.field_of_study}
                      </div>
                      <div className="text-primary-80">
                        {education.institution}
                      </div>
                      <div className="text-primary-80 text-sm">
                        {education.start_date
                          ? new Date(education.start_date).toLocaleDateString()
                          : ""}{" "}
                        -{" "}
                        {education.end_date
                          ? new Date(education.end_date).toLocaleDateString()
                          : ""}
                      </div>
                      <div className="text-primary-80 text-sm">
                        Grade: {education.grade}
                      </div>
                      <div className="text-primary-80 text-sm">
                        {education.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {onUpdateStatus && (
            <button
              onClick={onUpdateStatus}
              className="bg-primary-80 text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer"
            >
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
