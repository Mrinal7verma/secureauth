// Error handling middleware for consistent error responses
const errorHandler = (err, req, res, next) => {
  // Default error status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Format the error response
  const errorResponse = {
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  // Handle special cases
  if (err.name === "ValidationError") {
    errorResponse.statusCode = 400;
    errorResponse.errors = Object.values(err.errors).map(
      (error) => error.message
    );
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    errorResponse.statusCode = 409;
    errorResponse.message = "Duplicate field value entered";
  }

  // Send response
  res.status(statusCode).json(errorResponse);
};

// Custom error class for API errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  AppError,
};
