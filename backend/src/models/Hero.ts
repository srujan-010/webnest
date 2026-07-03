import mongoose, { Schema, Document } from 'mongoose';

interface ILogoItem {
  image: string;
  label: string;
  link?: string;
  order: number;
}

interface ICta {
  label: string;
  link: string;
}

export interface IHero extends Document {
  badge: string;
  headline: string;
  headlineHighlight?: string;
  subheadline: string;
  primaryCta: ICta;
  secondaryCta: ICta;
  logoStrip: ILogoItem[];
  isPublished: boolean;
  isDeleted: boolean;
  publishedAt?: Date;
}

const HeroSchema = new Schema<IHero>({
  badge: { type: String, default: 'Premium Software Agency' },
  headline: { type: String, required: true },
  headlineHighlight: { type: String },
  subheadline: { type: String },
  primaryCta: { 
    label: { type: String, default: 'Start Your Project' }, 
    link: { 
      type: String, 
      default: '/contact',
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return v.startsWith('/') || v.startsWith('http://') || v.startsWith('https://');
        },
        message: 'Enter a valid internal route (/contact) or a full URL (https://example.com).'
      }
    } 
  },
  secondaryCta: { 
    label: { type: String, default: 'View Our Work' }, 
    link: { 
      type: String, 
      default: '/portfolio',
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return v.startsWith('/') || v.startsWith('http://') || v.startsWith('https://');
        },
        message: 'Enter a valid internal route (/contact) or a full URL (https://example.com).'
      }
    } 
  },
  logoStrip: [{ image: String, label: String, link: String, order: { type: Number, default: 0 } }],
  isPublished: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);
