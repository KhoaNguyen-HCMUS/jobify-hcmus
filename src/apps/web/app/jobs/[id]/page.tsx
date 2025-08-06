"use client";
import { useState, useEffect, Suspense } from "react";
import JobDetail from "../../../components/job/jobDetail";
import { getJobById, JobDetailData } from "../../../services/jobs";
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from "next/navigation";
import { getUserRole } from "../../../utils/auth";

function JobDetailPageContent() {
  const [jobDetailData, setJobDetailData] = useState<JobDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isSaved = searchParams.get('saved') === 'true';
  const userRole = getUserRole();
  const isHR = userRole === 'company';

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await getJobById(id as string);
        if (response.success && response.data) {
          setJobDetailData(response.data);
        } else {
          toast.error(response.message || 'Unable to load job details');
        }
      } catch (error) {
        toast.error('Error loading job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!jobDetailData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Job not found</div>
      </div>
    );
  }

  return (
    <JobDetail jobDetailData={jobDetailData} isHR={isHR} isSaved={isSaved} />
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    }>
      <JobDetailPageContent />
    </Suspense>
  );
}