"use client";
import { FilePenLine, Mail, Phone, MapPin } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { jobs } from "../../../components/fakeJob";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { getProfile, Profile } from "../../../services/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CandidateDashboardContent() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 2);
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
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-primary text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-10">
        <div className="flex flex-wrap gap-15">
          <div className="flex-1 flex flex-wrap justify-between bg-highlight-20 rounded-2xl">
            <div className="flex flex-wrap">
              <div className="p-4">
                <img
                  src={profile?.profile_photo_url || "/avt.jpg"}
                  alt={profile?.full_name || "Profile"}
                  className="w-40 h-44 object-contain rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-4">
                <span className="text-primary text-xl font-semibold">
                  {profile?.full_name || "Not updated"}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="flex gap-2 text-primary">
                    <Mail size={24} />
                    <span>{profile?.phone || "Not updated"}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <Phone size={24} />
                    <span>{profile?.phone || "Not updated"}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <MapPin size={24} />
                    <span>{profile?.province && profile?.ward ? `${profile.province}, ${profile.ward}` : "Not updated"}</span>
                  </span>
                </div>
              </div>
            </div>
              <div className="p-4">
               <a href="/candidate/profile">
                 <FilePenLine size={24} className="text-primary cursor-pointer hover:text-primary-80 transition-colors" />
               </a>
             </div>
          </div>
          <div className="flex-1 bg-highlight-40 rounded-2xl shadow-lg">
            <div className="flex flex-col">
              <div className="flex justify-between px-4 py-2">
                <div className="text-xl text-primary font-semibold">
                  Notification
                </div>
                <a href="/candidate/notifications">
                  <span className="text-accent font-semibold cursor-pointer">
                    See All
                  </span>
                </a>
              </div>
              <Notification />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-15">
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between">
              <span className="text-primary font-semibold text-xl">
                Jobs Applied
              </span>
              <a href="/candidate/jobs-applied">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-6 px-4 py-4">
              {current.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Pagination
              page={page}
              maxPage={maxPage}
              onNext={next}
              onPrev={prev}
            />
          </div>
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between">
              <span className="text-primary font-semibold text-xl">
                Jobs Saved
              </span>
              <a href="/candidate/saved-jobs">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-6 px-4 py-4">
              {current.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Pagination
              page={page}
              maxPage={maxPage}
              onNext={next}
              onPrev={prev}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['candidate']}>
      <CandidateDashboardContent />
    </ProtectedRoute>
  );
}