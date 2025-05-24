import React from "react";
import LoginForm from "../components/LoginForm";
import AuthRedirect from "../components/AuthRedirect";

const LoginPage = () => {
  return (
    <AuthRedirect>
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] py-8 px-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default LoginPage;
