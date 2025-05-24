const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
} = require("../controllers/authController");

// Registration route
router.post("/register", register);

// Login route
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/reset-password/:token", resetPassword); // Add route with token parameter
router.get("/verify-reset-token/:token", verifyResetToken); // Verify token validity

module.exports = router;
