"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ override: true });
const MONGODB_URI = process.env.MONGODB_URI || '';
let isConnected = false;
async function connectDB() {
    if (isConnected)
        return;
    if (!MONGODB_URI)
        throw new Error('MONGODB_URI is not defined in environment variables');
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        isConnected = true;
        console.log('✅ MongoDB connected successfully');
    }
    catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
}
