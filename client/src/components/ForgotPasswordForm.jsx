import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import Alert from "./Alert";
import { validateEmail } from "../utils/validation";
import { forgotPassword } from "../utils/api";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setError("");
  };

  const validateForm = () => {
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err.message || "Failed to send password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="auth-card p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Sent</h2>
          <p className="text-gray-600 mb-6">
            If an account exists with the email{" "}
            <span className="font-medium">{email}</span>, you will receive
            password reset instructions shortly.
          </p>
          <p className="text-gray-600 mb-6">
            Please check your email inbox and spam folder.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Your Password?
        </h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="your@email.com"
          error={emailError}
          required
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
            size="lg"
          >
            Send Reset Link
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
