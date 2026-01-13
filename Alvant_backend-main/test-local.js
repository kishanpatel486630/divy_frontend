/**
 * Local Test Script - Verify fixes before deploying
 * Run: node test-local.js
 */

require("dotenv").config();

console.log("🧪 Testing Backend Configuration...\n");

// Test 1: Check Environment Variables
console.log("📋 Step 1: Environment Variables Check");
const requiredEnvVars = ["MONGODB_URI", "ADMIN_JWT_SECRET", "ADMIN_EMAIL"];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingVars.join(", ")
  );
  console.log("💡 Create a .env file based on .env.example\n");
  process.exit(1);
} else {
  console.log("✅ All required environment variables are set\n");
}

// Test 2: Check Module Loading
console.log("📋 Step 2: Module Loading Check");
try {
  const express = require("express");
  const mongoose = require("mongoose");
  const connectDB = require("./config/database");
  console.log("✅ All modules loaded successfully\n");
} catch (error) {
  console.error("❌ Module loading failed:", error.message);
  console.log("💡 Run: npm install\n");
  process.exit(1);
}

// Test 3: Test MongoDB Connection
console.log("📋 Step 3: MongoDB Connection Test");
const connectDB = require("./config/database");

(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connection successful\n");

    // Test 4: Load App
    console.log("📋 Step 4: Express App Loading");
    const app = require("./app");
    console.log("✅ Express app loaded successfully\n");

    console.log("🎉 All tests passed! Your backend is ready for deployment.\n");
    console.log("Next steps:");
    console.log(
      '1. Commit your changes: git add . && git commit -m "Fix serverless deployment"'
    );
    console.log("2. Push to repository: git push origin main");
    console.log("3. Configure environment variables in Vercel dashboard");
    console.log("4. Vercel will auto-deploy\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("\n💡 Troubleshooting:");
    console.log("- Check your MONGODB_URI format");
    console.log("- Ensure MongoDB Atlas allows your IP (add 0.0.0.0/0)");
    console.log("- Verify database user has proper permissions\n");
    process.exit(1);
  }
})();
