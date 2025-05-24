// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const validatePassword = (password) => {
  // Check if password meets requirements:
  // - At least 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one number
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  const isValid = minLength && hasUppercase && hasLowercase && hasNumber;

  // Return validation result and reasons if invalid
  if (!isValid) {
    const reasons = [];
    if (!minLength) reasons.push("Password must be at least 8 characters long");
    if (!hasUppercase)
      reasons.push("Password must contain at least one uppercase letter");
    if (!hasLowercase)
      reasons.push("Password must contain at least one lowercase letter");
    if (!hasNumber) reasons.push("Password must contain at least one number");

    return { isValid, reasons };
  }

  return { isValid };
};

// Validate user registration data
const validateUser = (userData) => {
  const errors = [];

  // Required fields
  const requiredFields = [
    "email",
    "firstName",
    "lastName",
    "gender",
    "mobileNumber",
    "password",
  ];

  for (const field of requiredFields) {
    if (!userData[field]) {
      errors.push(`${field} is required`);
    }
  }

  // Validate email if provided
  if (userData.email && !validateEmail(userData.email)) {
    errors.push("Email format is invalid");
  }

  // Validate password if provided
  if (userData.password) {
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.reasons);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUser,
};
