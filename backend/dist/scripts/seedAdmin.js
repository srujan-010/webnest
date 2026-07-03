"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const mongoose_1 = __importDefault(require("mongoose"));
const Admin_1 = __importDefault(require("../models/Admin"));
async function seed() {
    const MONGODB_URI = process.env.MONGODB_URI || '';
    if (!MONGODB_URI)
        throw new Error('MONGODB_URI not set');
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    const email = 'admin@webnest.agency';
    const existing = await Admin_1.default.findOne({ email: email });
    if (existing) {
        console.log(`⚠️  Admin user "${email}" already exists. Skipping.`);
        await mongoose_1.default.disconnect();
        return;
    }
    const admin = await Admin_1.default.create({
        name: 'WebNest Admin',
        email,
        password: 'Admin@12345',
        role: 'admin',
        isActive: true,
    });
    console.log('✅ Admin user created:');
    console.log('   Email:    ', email);
    console.log('   Password: ', 'Admin@12345');
    console.log('   Role:     ', admin.role);
    console.log('\n⚠️  CHANGE THE PASSWORD IMMEDIATELY AFTER FIRST LOGIN!\n');
    await mongoose_1.default.disconnect();
}
seed().catch(console.error);
