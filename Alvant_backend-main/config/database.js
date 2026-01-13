const mongoose = require("mongoose");

// Cached connection for serverless
let cachedConnection = null;

/**
 * Connect to MongoDB with connection caching for serverless
 * This prevents creating new connections on every request
 */
const connectDB = async () => {
  // If we have a cached connection and it's connected, reuse it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("📦 Using cached MongoDB connection");
    return cachedConnection;
  }

  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    throw new Error("MONGODB_URI is required");
  }

  try {
    // Configure mongoose for serverless
    mongoose.set("strictQuery", false);

    // Optimized connection options for serverless
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Limit connection pool
      minPoolSize: 1,
      maxIdleTimeMS: 10000,
    };

    console.log("🔌 Connecting to MongoDB...");
    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log("✅ MongoDB connected successfully");

    return cachedConnection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    cachedConnection = null;
    throw error;
  }
};

module.exports = connectDB;
