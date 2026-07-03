import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroShowcaseItem extends Document {
  project: mongoose.Types.ObjectId | any;
  isEnabled: boolean;
  isFeatured: boolean;
  order: number;
  customCtaLabel?: string;
  customCtaLink?: string;
  descriptionOverride?: string;
  overrideBannerImage?: string;
  overrideMobileImage?: string;
  isPublished: boolean;
  isDeleted: boolean;
}

const HeroShowcaseItemSchema = new Schema<IHeroShowcaseItem>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  isEnabled: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  customCtaLabel: { type: String },
  customCtaLink: { 
    type: String,
    validate: {
      validator: function(v: string) {
        if (!v) return true;
        return v.startsWith('/') || v.startsWith('http://') || v.startsWith('https://');
      },
      message: 'Enter a valid internal route (/contact) or a full URL (https://example.com).'
    }
  },
  descriptionOverride: { type: String },
  overrideBannerImage: { type: String },
  overrideMobileImage: { type: String },
  isPublished: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.HeroShowcaseItem || mongoose.model<IHeroShowcaseItem>('HeroShowcaseItem', HeroShowcaseItemSchema);
