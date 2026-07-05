import mongoose, { Schema, Document } from 'mongoose';

export interface IFeaturedProjectSection extends Document {
  draft: any;
  published: any;
  lastPublishedAt?: Date;
}

const FeaturedProjectSectionSchema = new Schema<IFeaturedProjectSection>({
  draft: { type: Schema.Types.Mixed, default: {} },
  published: { type: Schema.Types.Mixed, default: {} },
  lastPublishedAt: { type: Date }
}, { timestamps: true });

export default mongoose.models.FeaturedProjectSection || mongoose.model<IFeaturedProjectSection>('FeaturedProjectSection', FeaturedProjectSectionSchema);
