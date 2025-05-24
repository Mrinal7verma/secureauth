const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const {
  validateUser,
  validateEmail,
  validatePassword,
} = require("../utils/validation");
const { AppError } = require("../middleware/errorHandler");
const { sendResetEmail } = require("../utils/email");

// Register a new user
const register = async (req, res, next) => {
  try {
    // Validate user input
    const validation = validateUser(req.body);
    if (!validation.isValid) {
      // console.log(validation.errors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user object with hashed password
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber,
      city: req.body.city,
      password: hashedPassword,
      role: req.body.role || "Employee",
      passwordHistory: [{ password: hashedPassword, changedAt: new Date() }],
    });

    // Save user to database
    const savedUser = await user.save();

    // Generate JWT token
    const token = generateToken(savedUser._id);

    // Return success response with token
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        role: savedUser.role,
      },
    });
  } catch (error) {
    // console.error("Error in register:", error);
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Forgot password functionality
// Verify token validity without resetting password
const verifyResetToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    // Find user with the reset token and valid expiry
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return res.status(200).json({
        success: true,
        message:
          "If your email is registered, you will receive a password reset link",
      });
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token and store in database
    user.resetToken = resetToken;
    // Set token expiry (15 minutes)
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Send password reset email
    const emailSent = await sendResetEmail(
      user.email,
      resetToken,
      user.firstName
    );

    if (!emailSent) {
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();

      return res.status(500).json({
        success: false,
        message: "Failed to send reset email. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "If your email is registered, you will receive a password reset link",
    });
  } catch (error) {
    next(error);
  }
};

// Reset password functionality
const resetPassword = async (req, res, next) => {
  try {
    // Get token from params or body
    const tokenFromParams = req.params.token;
    const tokenFromBody = req.body.token;
    const token = tokenFromParams || tokenFromBody;
    const { password } = req.body;

    // Validate input
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password validation failed",
        errors: passwordValidation.reasons,
      });
    }

    // Find user with the reset token and valid expiry
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Check if new password is in password history
    const isPasswordInHistory = await Promise.all(
      user.passwordHistory.map(async (item) => {
        return await bcrypt.compare(password, item.password);
      })
    );

    if (isPasswordInHistory.includes(true)) {
      // console.log("Password is in history");
      return res.status(400).json({
        success: false,
        message: "Cannot reuse a recent password. Please choose a new one.",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and add to history
    user.password = hashedPassword;

    // Add new password to history and keep only the last 5
    user.passwordHistory.unshift({
      password: hashedPassword,
      changedAt: new Date(),
    });

    // Limit to 5 password history entries
    if (user.passwordHistory.length > 5) {
      user.passwordHistory = user.passwordHistory.slice(0, 5);
    }

    // Clear reset token
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
};
