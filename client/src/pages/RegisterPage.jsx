import React from "react";
import SignupForm from "../components/SignupForm";
import AuthRedirect from "../components/AuthRedirect";

const RegisterPage = () => {
  return (
    <AuthRedirect>
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] py-8 px-4">
        <div className="w-full max-w-lg">
          <SignupForm />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default RegisterPage;
