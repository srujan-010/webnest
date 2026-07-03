import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroShowcaseSettings extends Document {
  autoPlay: boolean;
  autoPlayInterval: number;
  infiniteLoop: boolean;
  transitionType: 'fade' | 'slide';
  transitionSpeed: number;
  showNavigation: boolean;
  showIndicators: boolean;
  browserWindowStyle: 'macOS' | 'generic' | 'minimal';
  desktopWidth: string;
  desktopHeight: string;
  mobileLayout: 'stack' | 'carousel' | 'hidden';
  isPublished: boolean;
  isDeleted: boolean;
  publishedAt?: Date;
}

const HeroShowcaseSettingsSchema = new Schema<IHeroShowcaseSettings>({
  autoPlay: { type: Boolean, default: true },
  autoPlayInterval: { type: Number, default: 4500 },
  infiniteLoop: { type: Boolean, default: true },
  transitionType: { type: String, enum: ['fade', 'slide'], default: 'fade' },
  transitionSpeed: { type: Number, default: 400 },
  showNavigation: { type: Boolean, default: true },
  showIndicators: { type: Boolean, default: true },
  browserWindowStyle: { type: String, enum: ['macOS', 'generic', 'minimal'], default: 'macOS' },
  desktopWidth: { type: String, default: '100%' },
  desktopHeight: { type: String, default: 'auto' },
  mobileLayout: { type: String, enum: ['stack', 'carousel', 'hidden'], default: 'carousel' },
  isPublished: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.HeroShowcaseSettings || mongoose.model<IHeroShowcaseSettings>('HeroShowcaseSettings', HeroShowcaseSettingsSchema);
