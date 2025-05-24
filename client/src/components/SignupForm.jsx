import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import FormInput from "./FormInput";
import Button from "./Button";
import Alert from "./Alert";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhoneNumber,
  validateConfirmPassword,
  validateRequired,
} from "../utils/validation";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    role: "Employee", // Default role
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Memale", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  // const roleOptions = [
  //   { value: "Employee", label: "Employee" },
  //   { value: "Admin", label: "Admin" },
  // ];

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

    // Validate name fields
    const firstNameError = validateName(formData.firstName, "First name");
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(formData.lastName, "Last name");
    if (lastNameError) newErrors.lastName = lastNameError;

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Validate phone number
    const mobileError = validatePhoneNumber(formData.mobileNumber);
    if (mobileError) newErrors.mobileNumber = mobileError;

    // Validate gender
    const genderError = validateRequired(formData.gender, "Gender");
    if (genderError) newErrors.gender = genderError;

    // Validate city
    const cityError = validateRequired(formData.city, "City");
    if (cityError) newErrors.city = cityError;

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
      // Prepare data for API (remove confirmPassword)
      const { confirmPassword, ...userData } = formData;
      console.log(userData);
      await registerUser(userData);

      // Show success and redirect to login
      alert("Registration successful! Please login with your new account.");
      navigate("/login");
    } catch (err) {
      setFormError(
        err.message || "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600">Fill in your information to get started</p>
      </div>

      {formError && <Alert type="error" message={formError} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="John"
            required
          />

          <FormInput
            label="Last Name"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Doe"
            required
          />
        </div>

        <FormInput
          label="Email Address"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your@email.com"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Mobile Number"
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={errors.mobileNumber}
            placeholder="1234567890"
            required
          />

          <FormInput
            label="Gender"
            id="gender"
            type="select"
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
            options={genderOptions}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormInput
            label="Role"
            id="role"
            type="select"
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
            options={roleOptions}
          /> */}

          <FormInput
            label="City"
            id="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            placeholder="New York"
            required
          />
        </div>

        <FormInput
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          required
        />

        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="••••••••"
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
            Create Account
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
