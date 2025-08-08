"use client";
import { BookUp } from "lucide-react";
import { useState, useEffect } from "react";
import KeyWord from "../../../components/keyWord";
// import JobDetailModal from "../../../components/JobDetailModal";
import { getPendingJobs, approveJob, rejectJob, PendingJob } from "../../../services/admin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function OperatorJobPendingPage() {
  const router = useRouter();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [jobs, setJobs] = useState<PendingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch pending jobs
  const fetchPendingJobs = async () => {
    try {
      setLoading(true);
      const response = await getPendingJobs();
      if (response.success) {
        setJobs(response.data);
      } else {
        toast.error(response.message || "Failed to fetch pending jobs");
      }
    } catch (error) {
      console.error("Error fetching pending jobs:", error);
      toast.error("An error occurred while fetching pending jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const handleRowClick = (id: string) => {
    // setSelectedJobId(id);
    // setShowModal(true);
    router.push(`/jobs/${id}`);
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  const handleApprove = async () => {
    if (!selectedJobId) return;
    
    try {
      const response = await approveJob(selectedJobId);
      if (response.success) {
        toast.success("Job approved successfully!");
        setShowModal(false);
        setSelectedJobId(null);
        fetchPendingJobs(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to approve job");
      }
    } catch (error) {
      console.error("Error approving job:", error);
      toast.error("An error occurred while approving job");
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedJobId || !reason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    
    try {
      const response = await rejectJob(selectedJobId, reason);
      if (response.success) {
        toast.success("Job rejected successfully!");
        setShowModal(false);
        setSelectedJobId(null);
        setRejectReason("");
        setShowRejectModal(false);
        fetchPendingJobs(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to reject job");
      }
    } catch (error) {
      console.error("Error rejecting job:", error);
      toast.error("An error occurred while rejecting job");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJobId(null);
    setRejectReason("");
    setShowRejectModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN');
  };

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-10">
        <div className="flex flex-wrap justify-between">
          <KeyWord />
          <div className="flex gap-2 text-primary">
            <b className="pt-2">Request Time:</b>
            <span className="text-primary-80 pt-2">from</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
              placeholder="Select Date"
            />
            <span className="text-primary-80 pt-2">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
              placeholder="Select Date"
            />
            <button className="bg-accent hover:bg-secondary cursor-pointer text-neutral-light-20 px-4 py-1 rounded-full">
              Filter
            </button>
          </div>
        </div>
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-4/13 border border-primary-60 p-2">
                  Job Title
                </th>
                <th className="w-2/13 border border-primary-60 p-2">Status</th>
                <th className="w-1/13 border border-primary-60 p-2">Detail</th>
                <th className="w-3/13 border border-primary-60 p-2">
                  Request Time
                </th>
                <th className="w-3/13 border border-primary-60 p-2">
                  Moderator's Note
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-primary-80">
                    Loading...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-primary-80">
                    No pending jobs found.
                  </td>
                </tr>
              ) : (
                jobs.map((job, index) => (
                  <tr
                    key={job.id}
                    onClick={() => handleRowClick(job.id)}
                    className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                    }`}
                  >
                    <td className="w-4/13 border border-primary-60 p-2">
                      <span className="line-clamp-1">{job?.title}</span>
                    </td>
                    <td className="w-2/13 border border-primary-60 p-2">
                      <span className="flex justify-center line-clamp-1">
                        {job?.status}
                      </span>
                    </td>
                    <td className="w-1/13 border border-primary-60 p-2">
                      <span className="flex justify-center line-clamp-1">
                        <BookUp />
                      </span>
                    </td>
                    <td className="w-3/13 border border-primary-60 p-2">
                      <span className="flex justify-center items-center line-clamp-1">
                        {formatDate(job?.created_at)} - {formatTime(job?.created_at)}
                      </span>
                    </td>
                    <td className="w-4/13 border border-primary-60 p-2">
                      <span className="line-clamp-1">
                        {job?.moderator_notes || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Job Detail Modal */}
          {/* <JobDetailModal
            job={selectedJob}
            isOpen={showModal}
            onClose={handleCloseModal}
            onApprove={handleApprove}
            onReject={handleReject}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
          /> */}
        </div>
      </div>
    </div>
  );
}
