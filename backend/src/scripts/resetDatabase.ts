/**
 * resetDatabase.ts
 * Drops every collection in the connected MongoDB database
 * and re-seeds the admin user so the CMS stays accessible.
 *
 * Run:  npx ts-node -r tsconfig-paths/register src/scripts/resetDatabase.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function resetDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI || '';
  if (!MONGODB_URI) {
    console.error('❌  MONGODB_URI is not set in .env');
    process.exit(1);
  }

  console.log('🔌  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅  Connected.');

  const db = mongoose.connection.db!;
  const collections = await db.listCollections().toArray();

  if (collections.length === 0) {
    console.log('ℹ️   Database is already empty.');
  } else {
    console.log(`\n🗑️   Dropping ${collections.length} collection(s):\n`);
    for (const col of collections) {
      await db.dropCollection(col.name);
      console.log(`     ✓  Dropped: ${col.name}`);
    }
  }

  // ── Re-seed admin user so login still works ──────────────────────────
  console.log('\n👤  Re-seeding admin user...');

  // Import Admin model AFTER mongoose is connected
  const { default: Admin } = await import('../models/Admin');

  const existing = await Admin.findOne({ email: 'admin@webnest.agency' } as any);
  if (existing) {
    console.log('ℹ️   Admin user already exists (was not dropped). Skipping seed.');
  } else {
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
  await mongoose.disconnect();
  process.exit(0);
}

resetDatabase().catch((err) => {
  console.error('❌  Reset failed:', err);
  mongoose.disconnect().finally(() => process.exit(1));
});
