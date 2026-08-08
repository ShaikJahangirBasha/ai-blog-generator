import dotenv from "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./config/db.js";



const PORT = process.env.PORT || 5000;

// Connect Database
await connectDB();

const server = app.listen(PORT, () => {
  console.log("======================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 http://localhost:${PORT}`);
  console.log("======================================");
});

// Handle Mongo Errors
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err.message);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");

  await mongoose.connection.close();

  server.close(() => {
    console.log("✅ Server Closed");
    process.exit(0);
  });
});

// Unhandled Promise
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);

  server.close(() => process.exit(1));
});