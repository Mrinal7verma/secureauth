import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../utils/api";
import FormInput from "./FormInput";
import Button from "./Button";
import Alert from "./Alert";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "../utils/validation";

const EditUserModal = ({ userId, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    city: "",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserById(userId);
        setUserData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          mobileNumber: response.data.mobileNumber || "",
          city: response.data.city || "",
          gender: response.data.gender || "",
          role: response.data.role || "Employee",
        });
      } catch (err) {
        setFormError("Failed to load user data. Please try again.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

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

    // Validate required fields
    const firstNameError = validateName(userData.firstName, "First name");
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(userData.lastName, "Last name");
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(userData.email);
    if (emailError) newErrors.email = emailError;

    if (userData.mobileNumber) {
      const phoneError = validatePhoneNumber(userData.mobileNumber);
      if (phoneError) newErrors.mobileNumber = phoneError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      await updateUser(userId, userData);
      onSave(userData); // Notify parent component that the user has been updated
    } catch (err) {
      setFormError(err.message || "Failed to update user. Please try again.");
      console.error("Error updating user:", err);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-slate-600/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-auto p-6 w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Edit User
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200 p-1 rounded-lg hover:bg-slate-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>{" "}
        {/* Modal Body */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-purple-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {formError && (
              <Alert type="error" message={formError} className="mb-4" />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="First Name"
                id="firstName"
                type="text"
                value={userData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />

              <FormInput
                label="Last Name"
                id="lastName"
                type="text"
                value={userData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>
            <FormInput
              label="Email Address"
              id="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="Phone Number"
                id="mobileNumber"
                type="text"
                value={userData.mobileNumber}
                onChange={handleChange}
                error={errors.mobileNumber}
              />

              <FormInput
                label="City"
                id="city"
                type="text"
                value={userData.city}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="Gender"
                id="gender"
                type="select"
                value={userData.gender}
                onChange={handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />

              <FormInput
                label="Role"
                id="role"
                type="select"
                value={userData.role}
                onChange={handleChange}
                options={[
                  { value: "Employee", label: "Employee" },
                  { value: "Admin", label: "Admin" },
                ]}
                required
              />
            </div>{" "}
            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-200">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={saving}
                disabled={saving}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
