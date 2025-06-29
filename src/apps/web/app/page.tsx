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
import Error404Page from "./error-404/page";
import Error403Page from "./error-403/page";

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

      case "/error-404":
        return <Error404Page />;

      case "/error-403":
        return <Error403Page />;

      default:
        return <HomePage />;
    }
  };

  return <div className="w-full min-h-screen">{renderPage()}</div>;
}
