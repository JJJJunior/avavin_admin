import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  console.log("Connected to DB");

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: process.env.MONGODB_DB_NAME || "",
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
