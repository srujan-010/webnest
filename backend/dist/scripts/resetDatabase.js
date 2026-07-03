"use strict";
/**
 * resetDatabase.ts
 * Drops every collection in the connected MongoDB database
 * and re-seeds the admin user so the CMS stays accessible.
 *
 * Run:  npx ts-node -r tsconfig-paths/register src/scripts/resetDatabase.ts
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function resetDatabase() {
    const MONGODB_URI = process.env.MONGODB_URI || '';
    if (!MONGODB_URI) {
        console.error('❌  MONGODB_URI is not set in .env');
        process.exit(1);
    }
    console.log('🔌  Connecting to MongoDB...');
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('✅  Connected.');
    const db = mongoose_1.default.connection.db;
    const collections = await db.listCollections().toArray();
    if (collections.length === 0) {
        console.log('ℹ️   Database is already empty.');
    }
    else {
        console.log(`\n🗑️   Dropping ${collections.length} collection(s):\n`);
        for (const col of collections) {
            await db.dropCollection(col.name);
            console.log(`     ✓  Dropped: ${col.name}`);
        }
    }
    // ── Re-seed admin user so login still works ──────────────────────────
    console.log('\n👤  Re-seeding admin user...');
    // Import Admin model AFTER mongoose is connected
    const { default: Admin } = await Promise.resolve().then(() => __importStar(require('../models/Admin')));
    const existing = await Admin.findOne({ email: 'admin@webnest.agency' });
    if (existing) {
        console.log('ℹ️   Admin user already exists (was not dropped). Skipping seed.');
    }
    else {
        await Admin.create({
            name: 'WebNest Admin',
            email: 'admin@webnest.agency',
            password: 'Admin@12345',
            role: 'admin',
            isActive: true,
        });
        console.log('\n✅  Admin user created:');
        console.log('   Email:    admin@webnest.agency');
        console.log('   Password: Admin@12345');
        console.log('   Role:     admin');
    }
    console.log('\n🎉  Database reset complete. All collections cleared.\n');
    await mongoose_1.default.disconnect();
    process.exit(0);
}
resetDatabase().catch((err) => {
    console.error('❌  Reset failed:', err);
    mongoose_1.default.disconnect().finally(() => process.exit(1));
});
