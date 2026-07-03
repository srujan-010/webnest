import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ override: true });

const MONGODB_URI = process.env.MONGODB_URI || '';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined in environment variables');

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}
