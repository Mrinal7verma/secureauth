import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import AuthRedirect from "../components/AuthRedirect";

const ForgotPasswordPage = () => {
  return (
    <AuthRedirect>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default ForgotPasswordPage;
