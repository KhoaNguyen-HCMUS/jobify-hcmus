"use client";
import { BookUp } from "lucide-react";
import { useState, useEffect } from "react";
import KeyWord from "../../../components/keyWord";
import CompanyDetailModal from "../../../components/companyDetailModal";
import { getPendingCompanies, approveCompany, rejectCompany, PendingCompany } from "../../../services/admin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OperatorCompanyPendingPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [companies, setCompanies] = useState<PendingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Fetch pending companies
  const fetchPendingCompanies = async () => {
    try {
      setLoading(true);
      const response = await getPendingCompanies();
      if (response.success) {
        setCompanies(response.data);
      } else {
        toast.error(response.message || "Failed to fetch pending companies");
      }
    } catch (error) {
      console.error("Error fetching pending companies:", error);
      toast.error("An error occurred while fetching pending companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCompanies();
  }, []);

  const handleRowClick = (id: string) => {
    setSelectedCompanyId(id);
    setShowModal(true);
  };

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const handleApprove = async () => {
    if (!selectedCompanyId) return;
    
    try {
      const response = await approveCompany(selectedCompanyId);
      if (response.success) {
        toast.success("Company approved successfully!");
        setShowModal(false);
        setSelectedCompanyId(null);
        fetchPendingCompanies(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to approve company");
      }
    } catch (error) {
      console.error("Error approving company:", error);
      toast.error("An error occurred while approving company");
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedCompanyId || !reason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    
    try {
      const response = await rejectCompany(selectedCompanyId, reason);
      if (response.success) {
        toast.success("Company rejected successfully!");
        setShowModal(false);
        setSelectedCompanyId(null);
        setRejectReason("");
        setShowRejectModal(false);
        fetchPendingCompanies(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to reject company");
      }
    } catch (error) {
      console.error("Error rejecting company:", error);
      toast.error("An error occurred while rejecting company");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompanyId(null);
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
                <th className="w-4/15 border border-primary-60 p-2">
                  Company Name
                </th>
                <th className="w-2/15 border border-primary-60 p-2">Status</th>
                <th className="w-1/15 border border-primary-60 p-2">Flag</th>
                <th className="w-1/15 border border-primary-60 p-2">Profile</th>
                <th className="w-3/15 border border-primary-60 p-2">
                  Request Time
                </th>
                <th className="w-4/15 border border-primary-60 p-2">
                  Moderator's Note
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-primary-80">
                    Loading...
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-primary-80">
                    No pending companies found.
                  </td>
                </tr>
              ) : (
                companies.map((company, index) => (
                  <tr
                    key={company.id}
                    onClick={() => handleRowClick(company.id)}
                    className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                    }`}
                  >
                    <td className="w-4/15 border border-primary-60 p-2">
                      <span className="line-clamp-1">
                        {company?.company_name}
                      </span>
                    </td>
                    <td className="w-2/15 border border-primary-60 p-2">
                      <span className="line-clamp-1">{company?.status}</span>
                    </td>
                    <td className="w-1/15 border border-primary-60 p-2">
                      <span className="line-clamp-1">-</span>
                    </td>
                    <td className="w-1/15 border border-primary-60 p-2">
                      <span className="line-clamp-1"><BookUp /></span>
                    </td>
                    <td className="w-3/15 border border-primary-60 p-2">
                      <span className="flex justify-center items-center line-clamp-1">
                        {formatDate(company?.created_at)} - {formatTime(company?.created_at)}
                      </span>
                    </td>
                    <td className="w-4/15 border border-primary-60 p-2">
                      <span className="line-clamp-1">-</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Company Detail Modal */}
          <CompanyDetailModal
            company={selectedCompany}
            isOpen={showModal}
            onClose={handleCloseModal}
            onApprove={handleApprove}
            onReject={handleReject}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
          />
        </div>
      </div>
    </div>
  );
}
