"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env'), override: true });
const Project_1 = __importDefault(require("../models/Project"));
const db_1 = require("../config/db");
const replacementImages = {
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
    await (0, db_1.connectDB)();
    console.log('Connected to MongoDB. Starting project image migration...');
    const projects = await Project_1.default.find({ isDeleted: { $ne: true } });
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
        }
        else {
            console.log(`No replacement mapping found for slug: ${slug}, skipping...`);
        }
    }
    console.log('🎉 Migration completed successfully!');
    mongoose_1.default.connection.close();
}
run();
