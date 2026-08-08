import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const connection = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );

    console.log("======================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📦 Database : ${connection.connection.name}`);
    console.log(`🌐 Host     : ${connection.connection.host}`);
    console.log("======================================");
  } catch (error) {
    console.error("======================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("======================================");

    process.exit(1);
  }
};

export default connectDB;