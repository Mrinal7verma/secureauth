const User = require("../models/User");
const { AppError } = require("../middleware/errorHandler");

// Get all users - authenticated users only
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "-password -passwordHistory -resetToken -resetTokenExpiry"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -passwordHistory -resetToken -resetTokenExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user - admin only
const updateUser = async (req, res, next) => {
  try {
    // Don't allow updates to these fields
    const restrictedFields = [
      "password",
      "lastLogin",
      "passwordHistory",
      "resetToken",
      "resetTokenExpiry",
    ];

    // Check if any restricted fields are being modified
    const hasRestrictedFields = restrictedFields.some((field) =>
      req.body.hasOwnProperty(field)
    );
    if (hasRestrictedFields) {
      return res.status(400).json({
        success: false,
        message: "Cannot update restricted fields",
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password -passwordHistory -resetToken -resetTokenExpiry");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -passwordHistory -resetToken -resetTokenExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    next(error);
  }
};

// Delete user - admin only
const deleteUser = async (req, res, next) => {
  try {
    // Check if admin is trying to delete their own account
    if (req.params.id === req.userId) {
      return res.status(403).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateUser,
  deleteUser,
  getUser,
};
