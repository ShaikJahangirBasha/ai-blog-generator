const errorMiddleware = (err, req, res, next) => {
  console.error("======================================");
  console.error("❌ Error:", err);
  console.error("======================================");

  // Invalid Mongo ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID.",
    });
  }

  // Mongo Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      (item) => item.message
    );

    return res.status(400).json({
      success: false,
      message: errors.join(", "),
    });
  }

  // Duplicate Key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists.`,
    });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired.",
    });
  }

  // Default Error
  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
};

export default errorMiddleware;