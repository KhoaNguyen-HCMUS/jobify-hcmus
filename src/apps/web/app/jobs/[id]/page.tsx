"use client";
import { useState, useEffect } from "react";
import JobDetail from "../../../components/job/jobDetail";
import { getJobById, JobDetailData } from "../../../services/jobs";
import { toast } from 'react-toastify';
import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const [jobDetailData, setJobDetailData] = useState<JobDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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

  return <JobDetail jobDetailData={jobDetailData} isHR={false} />;
}
