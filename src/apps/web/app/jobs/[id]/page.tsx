"use client";
import { useState, useEffect } from "react";
import JobDetail from "../../../components/job/jobDetail";
import { getJobById, Job } from "../../../services/jobs";
import { toast } from 'react-toastify';
import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await getJobById(id as string);
        if (response.success && response.data) {
          setJob(response.data);
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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Job not found</div>
      </div>
    );
  }

  return <JobDetail job={job} isHR={false} />;
}
