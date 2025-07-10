"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import HomePage from "./home/page";
import SignInPage from "./sign-in/page";
import SignUpWithRolePage from "./sign-up-with-role/page";
import JobDetailPage from "./job-detail/page";
import BrowseJobsPage from "./browse-jobs/page";
import CandidateRegistrationPage from "./candidate-registration/page";
import CompanyRegistrationPage from "./company-registration/page";
import PendingApprovalPage from "./pending-approval/page";
import ForgotPasswordFirstPage from "./forgot-password-first/page";
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
import ChangePasswordPage from "./candidate/change-password/page";
import JobsSavedPage from "./candidate/saved-jobs/page";
import JobsAppliedPage from "./candidate/jobs-applied/page";
import NotificationsPage from "./candidate/notifications/page";
import ReportsPage from "./candidate/reports/page";

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

      case "/sign-in":
        return <SignInPage />;

      case "/sign-up-with-role":
        return <SignUpWithRolePage />;

      case "/browse-jobs":
        return <BrowseJobsPage />;

      case "/job-detail":
        return <JobDetailPage />;

      case "/candidate-registration":
        return <CandidateRegistrationPage />;

      case "/company-registration":
        return <CompanyRegistrationPage />;

      case "/pending-approval":
        return <PendingApprovalPage />;

      case "/forgot-password-first":
        return <ForgotPasswordFirstPage />;

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
        return <ChangePasswordPage />;

      case "/candidate/jobs-applied":
        return <JobsAppliedPage />;

      case "/candidate/saved-jobs":
        return <JobsSavedPage />;

      case "/candidate/notifications":
        return <NotificationsPage />;

      case "/candidate/reports":
        return <ReportsPage />;

      default:
        return <HomePage />;
    }
  };

  return <div className="w-full min-h-screen">{renderPage()}</div>;
}
