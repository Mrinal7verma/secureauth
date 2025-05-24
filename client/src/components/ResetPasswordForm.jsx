import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import Alert from "./Alert";
import { validatePassword, validateConfirmPassword } from "../utils/validation";
import { resetPassword } from "../utils/api";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Countdown for redirect after successful password reset
  useEffect(() => {
    if (!isSuccess) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/login");
    }
  }, [isSuccess, countdown, navigate]);

  // Validate token exists
  useEffect(() => {
    if (!token) {
      setFormError("Invalid password reset link. Please request a new one.");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors on typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    if (formError) {
      setFormError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Validate confirm password
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await resetPassword(token, formData.password);
      setIsSuccess(true);
    } catch (err) {
      // console.log("Error resetting password:", err);
      // Use the specific error message from the server if available
      const errorMessage =
        err ||
        "Failed to reset password. The link may have expired. Please try again.";
      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully updated. You can now login with
            your new password.
          </p>
          <div className="p-4 bg-blue-50 rounded-md inline-block">
            <p className="text-blue-800">
              Redirecting to login page in{" "}
              <span className="font-bold">{countdown}</span> seconds...
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Login now
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
          Reset Your Password
        </h2>
        <p className="text-gray-600">Please enter your new password below</p>
      </div>

      {formError && <Alert type="error" message={formError} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="New Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
          required
        />

        <FormInput
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.confirmPassword}
          required
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading || !token}
            size="lg"
          >
            Reset Password
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

export default ResetPasswordForm;
