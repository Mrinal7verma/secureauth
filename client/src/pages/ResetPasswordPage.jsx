import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
