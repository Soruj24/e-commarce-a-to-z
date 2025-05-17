import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGO_URI } from '../secret';

dotenv.config();

 
  export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log( ('MongoDB connected successfully!'));
  } catch (error) {
    console.error( ('Error connecting to MongoDB:'), error);
    process.exit(1);
  }
};



