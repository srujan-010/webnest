import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import ProcessStep from './src/models/ProcessStep';
import ComparisonRow from './src/models/ComparisonRow';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webnest';

const timelineSteps = [
  { title: "Discovery", desc: "A deep dive call into your business goals, technical constraints, and product requirements to ensure perfect alignment.", icon: "Target", order: 1 },
  { title: "Plan", desc: "We deliver a comprehensive architectural blueprint, transparent roadmap, and fixed-price proposal with no hidden surprises.", icon: "Briefcase", order: 2 },
  { title: "Design", desc: "You review pixel-perfect, accessible, and high-converting UI/UX designs before we write a single line of code.", icon: "Layout", order: 3 },
  { title: "Develop", desc: "We write clean, scalable code while giving you access to weekly sprint demos so you always see our progress.", icon: "Code", order: 4 },
  { title: "Test", desc: "Your product undergoes rigorous automated and manual QA to ensure a bug-free experience across all devices.", icon: "TestTube", order: 5 },
  { title: "Launch", desc: "A seamless, zero-downtime deployment to production, handing over 100% of the source code and IP to you.", icon: "Rocket", order: 6 },
  { title: "Grow/Support", desc: "We provide an ongoing SLA, active monitoring, and strategic feature iteration as your business scales.", icon: "TrendingUp", order: 7 }
];

const comparisonTable = [
  { criteria: "Communication", typicalAgencyText: "Black box approach with sparse, irregular updates.", webnestText: "✓ Transparent weekly sprints and direct developer access.", order: 1 },
  { criteria: "Ownership of Code", typicalAgencyText: "Often withheld, licensed, or locked in proprietary CMS.", webnestText: "✓ 100% full source code and IP handed over.", order: 2 },
  { criteria: "Post-Launch Support", typicalAgencyText: "Support ends immediately at launch.", webnestText: "✓ Ongoing SLA partnership and monthly strategic check-ins.", order: 3 },
  { criteria: "Pricing Transparency", typicalAgencyText: "Vague estimates leading to massive budget overruns.", webnestText: "✓ Detailed, fixed-price quotes with guaranteed delivery.", order: 4 },
  { criteria: "Team Continuity", typicalAgencyText: "Rotating cast of outsourced freelancers.", webnestText: "✓ A dedicated, cohesive in-house engineering team.", order: 5 },
  { criteria: "Scalability Planning", typicalAgencyText: "Built for today, breaks when you get 10x traffic.", webnestText: "✓ Cloud-native, microservice-ready architecture from Day 1.", order: 6 }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    console.log('Seeding ProcessSteps...');
    for (const step of timelineSteps) {
      await (ProcessStep as any).findOneAndUpdate(
        { title: step.title },
        step,
        { upsert: true, new: true }
      );
    }
    
    console.log('Seeding ComparisonRows...');
    for (const row of comparisonTable) {
      await (ComparisonRow as any).findOneAndUpdate(
        { criteria: row.criteria },
        row,
        { upsert: true, new: true }
      );
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
