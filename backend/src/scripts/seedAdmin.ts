import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import Admin from '../models/Admin';

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI || '';
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set');

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const email = 'admin@webnest.agency';
  const existing = await Admin.findOne({ email: email } as any);
  if (existing) {
    console.log(`⚠️  Admin user "${email}" already exists. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  const admin = await Admin.create({
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

  await mongoose.disconnect();
}

seed().catch(console.error);
