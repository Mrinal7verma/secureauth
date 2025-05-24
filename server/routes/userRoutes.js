const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getProfile,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

// Get all users and user profile routes
// Both require authentication
router.get("/", authenticateToken, getAllUsers);
router.get("/profile", authenticateToken, getProfile);
// Get specific user by ID - must be placed after specific routes
router.get("/:id", authenticateToken, getUser);

// Admin-only routes for updating and deleting users
router.put("/:id", authenticateToken, requireAdmin, updateUser);
router.delete("/:id", authenticateToken, requireAdmin, deleteUser);

module.exports = router;
