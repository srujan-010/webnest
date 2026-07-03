import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  icon: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string; // compatibility alias
  longDescription?: string;
  link: string;
  className?: string;
  iconClass?: string;
  textClass?: string;
  buttonClass?: string;
  large?: boolean;
  featured: boolean;
  order: number;
  isActive: boolean;
  isPublished: boolean; // compatibility alias
  isDeleted: boolean;
}

const ServiceSchema = new Schema<IService>({
  icon: { type: String, default: 'Code2' },
  title: { type: String, required: true },
  slug: { type: String },
  shortDescription: { type: String, required: true },
  description: { type: String },
  longDescription: { type: String },
  link: { type: String, default: '/services' },
  className: { type: String },
  iconClass: { type: String },
  textClass: { type: String },
  buttonClass: { type: String },
  large: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

ServiceSchema.pre('save', function () {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  if (this.shortDescription && !this.description) {
    this.description = this.shortDescription;
  }
  if (this.description && !this.shortDescription) {
    this.shortDescription = this.description;
  }
  if (this.isActive !== undefined && this.isPublished === undefined) {
    this.isPublished = this.isActive;
  }
  if (this.isPublished !== undefined && this.isActive === undefined) {
    this.isActive = this.isPublished;
  }
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
