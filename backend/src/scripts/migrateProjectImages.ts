import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

import Project from '../models/Project';
import { connectDB } from '../config/db';

const replacementImages: Record<string, string> = {
  'swastika-sarees': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  'shoppluse-pos': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'suryodaya-farms': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  'tsquadron': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'ima-warangal': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  'nani-ka-chulha': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
  'chitti-management-system': 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=1200&q=80',
  'recharge-platform': 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=1200&q=80',
};

async function run() {
  await connectDB();
  console.log('Connected to MongoDB. Starting project image migration...');

  const projects = await Project.find({ isDeleted: { $ne: true } });
  console.log(`Found ${projects.length} active projects in database.`);

  for (const p of projects) {
    const slug = p.slug;
    const replacement = replacementImages[slug];
    if (replacement) {
      console.log(`Updating project "${p.name}" (slug: ${slug}):`);
      p.desktopImage = replacement;
      p.thumbnail = replacement;
      p.coverImage = replacement;
      p.image = replacement;
      await p.save();
      console.log(`  ... Successfully updated and synced image fields for ${slug}!`);
    } else {
      console.log(`No replacement mapping found for slug: ${slug}, skipping...`);
    }
  }

  console.log('🎉 Migration completed successfully!');
  mongoose.connection.close();
}

run();
