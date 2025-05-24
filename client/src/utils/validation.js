// Basic form validation utility

// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!regex.test(email)) return "Please enter a valid email address";
  return "";
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*[0-9])/.test(password))
    return "Password must contain at least one number";
  return "";
};

// Name validation
export const validateName = (name, field = "Name") => {
  if (!name) return `${field} is required`;
  if (name.length < 2) return `${field} must be at least 2 characters`;
  return "";
};

// Phone number validation
export const validatePhoneNumber = (phone) => {
  const regex = /^\d{10}$/;
  if (!phone) return "Phone number is required";
  if (!regex.test(phone)) return "Please enter a valid 10-digit phone number";
  return "";
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};

// Required field validation
export const validateRequired = (value, field) => {
  if (!value) return `${field} is required`;
  return "";
};
