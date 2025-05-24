import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "./FormInput";
import Button from "./Button";
import Alert from "./Alert";
import { validateEmail, validatePassword } from "../utils/validation";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (formError) {
      setFormError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setFormError(
        err.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>

      {formError && <Alert type="error" message={formError} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
          required
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
