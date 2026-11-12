import mongoose from "mongoose";
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.log("DB Error:", err));

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
      socketTimeoutMS: 45000, // 45s socket timeout
    });
  } catch (error) {
    console.log("Database Connection Failed:", error.message);
  }
};

export default connectDB

