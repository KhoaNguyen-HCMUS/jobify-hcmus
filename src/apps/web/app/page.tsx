"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import HomePage from "./home/page";
import LogInPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";
import JobsPage from "./jobs/page";
import CandidateRegistrationPage from "./register/candidate/page";
import CompanyRegistrationPage from "./register/company/page";
import PendingApprovalPage from "./pending-approval/page";
import ForgotPasswordPage from "./forgot-password/page";
import ForgotPasswordSecondPage from "./forgot-password-second/page";
import ForgotPasswordThirdPage from "./forgot-password-third/page";
import Error404Page from "./not-found";
import Error403Page from "./error-403/page";
import SupportPage from "./support/page";
import AboutUsPage from "./about-us/page";
import RecommendedPage from "./recommended/page";
import CandidateDashboardPage from "./candidate/dashboard/page";
import CandidateProfilePage from "./candidate/profile/page";
import CandidateProfileEditPage from "./candidate/profile/edit/page";
import CandidateChangePasswordPage from "./candidate/change-password/page";
import CandidateJobsSavedPage from "./candidate/saved-jobs/page";
import CandidateJobsAppliedPage from "./candidate/jobs-applied/page";
import CandidateNotificationsPage from "./candidate/notifications/page";
import CandidateReportsPage from "./candidate/reports/page";
import RecruiterDashboardPage from "./recruiter/dashboard/page";
import RecruiterProfilePage from "./recruiter/profile/page";
import RecruiterProfileEditPage from "./recruiter/profile/edit/page";
import RecruiterJobsPage from "./recruiter/jobs/page";
import RecruiterChangePasswordPage from "./recruiter/change-password/page";
import RecruiterNotificationsPage from "./recruiter/notifications/page";
import RecruiterReportsPage from "./recruiter/reports/page";
import RecruiterWalletPage from "./recruiter/wallet/page";
import RecruiterApplicationsPage from "./recruiter/applications/page";
import OperatorCompanyPendingPage from "./operator/company-pending/page";
import OperatorJobPendingPage from "./operator/job-pending/page";
import OperatorReportsPage from "./operator/reports/page";
import OperatorAnnouncementsPage from "./operator/announcements/page";
import OperatorNotificationsPage from "./operator/notifications/page";
import OperatorChangePasswordPage from "./operator/change-password/page";
import OperatorUsersPage from "./operator/users/page";
import OperatorLogsPage from "./operator/logs/page";
import OperatorSystemSettingsPage from "./operator/system-settings/page";

export default function App() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <HomePage />;

      case "/auth/login":
        return <LogInPage />;

      case "/auth/register":
        return <RegisterPage />;

      case "/jobs":
        return <JobsPage />;

      case "/register/candidate":
        return <CandidateRegistrationPage />;

      case "/register/company":
        return <CompanyRegistrationPage />;

      case "/pending-approval":
        return <PendingApprovalPage />;

      case "/forgot-password":
        return <ForgotPasswordPage />;

      case "/forgot-password-second":
        return <ForgotPasswordSecondPage />;

      case "/forgot-password-third":
        return <ForgotPasswordThirdPage />;

      case "/not-found":
        return <Error404Page />;

      case "/error-403":
        return <Error403Page />;

      case "/support":
        return <SupportPage />;

      case "/about-us":
        return <AboutUsPage />;

      case "/recommended":
        return <RecommendedPage />;

      case "/candidate/dashboard":
        return <CandidateDashboardPage />;

      case "/candidate/profile":
        return <CandidateProfilePage />;

      case "/candidate/profile/edit":
        return <CandidateProfileEditPage />;

      case "/candidate/change-password":
        return <CandidateChangePasswordPage />;

      case "/candidate/jobs-applied":
        return <CandidateJobsAppliedPage />;

      case "/candidate/saved-jobs":
        return <CandidateJobsSavedPage />;

      case "/candidate/notifications":
        return <CandidateNotificationsPage />;

      case "/candidate/reports":
        return <CandidateReportsPage />;

      case "/recruiter/dashboard":
        return <RecruiterDashboardPage />;

      case "/recruiter/profile":
        return <RecruiterProfilePage />;

      case "/recruiter/profile/edit":
        return <RecruiterProfileEditPage />;

      case "/recruiter/jobs":
        return <RecruiterJobsPage />;

      case "/recruiter/wallet":
        return <RecruiterWalletPage />;

      case "/recruiter/change-password":
        return <RecruiterChangePasswordPage />;

      case "/recruiter/notifications":
        return <RecruiterNotificationsPage />;

      case "/recruiter/reports":
        return <RecruiterReportsPage />;

      case "/recruiter/applications":
        return <RecruiterApplicationsPage />;

      case "/operator/company-pending":
        return <OperatorCompanyPendingPage />;

      case "/operator/job-pending":
        return <OperatorJobPendingPage />;

      case "/operator/reports":
        return <OperatorReportsPage />;

      case "/operator/announcements":
        return <OperatorAnnouncementsPage />;

      case "/operator/notifications":
        return <OperatorNotificationsPage />;

      case "/operator/change-password":
        return <OperatorChangePasswordPage />;

      case "/operator/users":
        return <OperatorUsersPage />;

      case "/operator/logs":
        return <OperatorLogsPage />;

      case "/operator/system-settings":
        return <OperatorSystemSettingsPage />;

      default:
        return <HomePage />;
    }
  };

  return <div className="w-full min-h-screen">{renderPage()}</div>;
}
