"use client";
import { MapPin, Briefcase, User, Phone, Calendar, VenusAndMars, Globe, Github, Linkedin, Edit, Mail, GraduationCap, Building, Clock, Award } from "lucide-react";
import PersonalInformation from "../../../components/personalInformation";
import Skills from "../../../components/skills";
import Education from "../../../components/education";
import WorkExperience from "../../../components/workExperience";
import { getProfile, Profile } from "../../../services/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { formatDateForDisplay } from "../../../utils/dateUtils";

function CandidateProfileContent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        toast.error(response.message || 'Failed to load profile');
      }
    } catch (error) {
      toast.error('Error loading profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-neutral-light-60 flex items-center justify-center">
        <div className="text-primary text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full h-full bg-neutral-light-60 flex items-center justify-center">
        <div className="text-primary text-xl">Profile not found</div>
      </div>
    );
  }

  const skills = profile.skills ? profile.skills.split(',').map(skill => ({ skill: skill.trim() })).filter(skill => skill.skill) : [];

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10">
        <div className="text-accent font-bold text-2xl">
          Personal Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation
                title="Full Name"
                inFor={profile.full_name}
              />
              <PersonalInformation title="Phone" inFor={profile.phone} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation title="Gender" inFor={profile.gender} />
              <PersonalInformation
                title="Date of Birth"
                inFor={profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'Not specified'}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <b className="text-primary">Introduce yourself:</b>
            <span className="text-primary-80">{profile.bio || 'No bio available'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <b className="text-primary">Location detail:</b>
            <div className="flex flex-wrap gap-2 text-primary-80">
              <MapPin className="w-4 h-4" />
              <span className="flex justify-between">{profile.address_detail}, {profile.ward}, {profile.province}</span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation title="Industry" inFor={profile.industry} />
              <a href={profile.github_url}>
              <PersonalInformation title="GitHub" inFor={profile.github_url} />
              </a>
              <div className="flex flex-col gap-2">
                <span className="text-primary text-lg">
                  <b>Skills:</b>
                </span>
                <div className="flex flex-wrap gap-2 items-center text-primary-80 font-semibold">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <div className="flex flex-wrap gap-2 ">
                    {skills.length > 0 ? (
                      skills.map((skill, idx) => (
                        <Skills key={idx} skill={skill.skill} />
                      ))
                    ) : (
                      <span className="text-primary-60">No skills specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <a href={profile.linkedin_url}></a>
              <PersonalInformation title="LinkedIn" inFor={profile.linkedin_url} />
              <a href={profile.website}>
                <PersonalInformation
                  title="Personal website"
                  inFor={profile.website}
                />
              </a>
            </div>
          </div>
          
          {/* Simple Work Experience Section */}
          <div className="flex flex-wrap gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary mb-4">Work Experience</h2>
              <div className="space-y-4">
                {profile.experiences && profile.experiences.length > 0 ? (
                  profile.experiences.map((exp, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="font-bold text-primary">{exp.job_title}</h3>
                      <p className="italic font-bold text-secondary">{exp.company_name}</p>
                      <p className="text-sm text-accent mb-2">
                        {exp.start_date ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'} - {exp.is_current ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A')}
                      </p>
                      {exp.description && (
                        <div>
                          <p className="font-semibold text-primary text-sm">Achievements:</p>
                          <ul className="list-disc list-inside text-sm text-primary-80 ml-2">
                            {exp.description.split('\n').map((line, i) => (
                              <li key={i}>{line.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-primary-60">No work experience added yet</p>
                )}
              </div>
            </div>

            {/* Simple Education Section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
              <div className="space-y-4">
                {profile.educations && profile.educations.length > 0 ? (
                  profile.educations.map((edu, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="font-bold text-primary">{edu.degree}</h3>
                      <p className="italic font-bold text-secondary">{edu.institution}</p>
                      <p className="text-sm text-accent mb-2">
                        {edu.start_date ? new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'} - {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </p>
                      <div>
                        <p className="font-semibold text-secondary text-sm">Achievements:</p>
                        <ul className="list-disc list-inside text-sm text-primary-80 ml-2">
                          {edu.grade && <li>GPA: {edu.grade}</li>}
                          {edu.field_of_study && <li>Field of Study: {edu.field_of_study}</li>}
                          {edu.description && (
                            <li>{edu.description}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-primary-60">No education added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="bg-accent hover:bg-secondary cursor-pointer text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/candidate/profile/edit">Edit</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateProfilePage() {
  return (
    <ProtectedRoute allowedRoles={['candidate']}>
      <CandidateProfileContent />
    </ProtectedRoute>
  );
}
