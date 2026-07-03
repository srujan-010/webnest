import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  contentRichText: string;
  body: string; // compatibility alias
  coverImage?: string;
  author: mongoose.Types.ObjectId | string;
  publishedAt?: Date;
  publishedDate?: Date; // compatibility alias
  category: string;
  tags: string[];
  readTimeMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoDesc?: string; // compatibility alias
  status: 'draft' | 'published' | 'scheduled';
  scheduledAt?: Date;
  isDeleted: boolean;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: { type: String },
  contentRichText: { type: String, default: '' },
  body: { type: String, default: '' },
  coverImage: { type: String },
  author: { type: Schema.Types.Mixed, required: true }, // Mixed to allow both ref ObjectId and legacy string name
  publishedAt: { type: Date },
  publishedDate: { type: Date },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  readTimeMinutes: { type: Number, default: 3 },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoDesc: { type: String },
  status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
  scheduledAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

BlogPostSchema.pre('save', function () {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  // Sync contentRichText and body
  if (this.contentRichText && !this.body) this.body = this.contentRichText;
  if (this.body && !this.contentRichText) this.contentRichText = this.body;

  // Sync seoDescription and seoDesc
  if (this.seoDescription && !this.seoDesc) this.seoDesc = this.seoDescription;
  if (this.seoDesc && !this.seoDescription) this.seoDescription = this.seoDesc;

  // Sync dates
  if (this.publishedAt && !this.publishedDate) this.publishedDate = this.publishedAt;
  if (this.publishedDate && !this.publishedAt) this.publishedAt = this.publishedDate;

  // Sync excerpt from body if missing
  if (!this.excerpt && this.body) {
    this.excerpt = this.body.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  }
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
