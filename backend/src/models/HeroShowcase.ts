import mongoose, { Schema, Document } from 'mongoose';

export interface IShowcaseItem {
  project: mongoose.Types.ObjectId | any;
  isEnabled: boolean;
  isFeatured: boolean;
  order: number;
}

export interface IHeroShowcase extends Document {
  autoPlay: boolean;
  autoPlayInterval: number;
  infiniteLoop: boolean;
  transitionType: 'fade' | 'slide';
  transitionSpeed: number;
  showNavigation: boolean;
  showIndicators: boolean;
  browserWindowStyle: 'macOS' | 'generic' | 'minimal';
  featuredProjects: IShowcaseItem[];
  isPublished: boolean;
  isDeleted: boolean;
  publishedAt?: Date;
}

const ShowcaseItemSchema = new Schema<IShowcaseItem>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  isEnabled: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

const HeroShowcaseSchema = new Schema<IHeroShowcase>({
  autoPlay: { type: Boolean, default: true },
  autoPlayInterval: { type: Number, default: 4500 },
  infiniteLoop: { type: Boolean, default: true },
  transitionType: { type: String, enum: ['fade', 'slide'], default: 'fade' },
  transitionSpeed: { type: Number, default: 400 },
  showNavigation: { type: Boolean, default: true },
  showIndicators: { type: Boolean, default: true },
  browserWindowStyle: { type: String, enum: ['macOS', 'generic', 'minimal'], default: 'macOS' },
  featuredProjects: [ShowcaseItemSchema],
  isPublished: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.HeroShowcase || mongoose.model<IHeroShowcase>('HeroShowcase', HeroShowcaseSchema);
