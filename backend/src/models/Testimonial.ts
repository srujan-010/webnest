import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  name: string; // compatibility alias
  clientPhoto?: string;
  photo?: string; // compatibility alias
  companyName: string;
  company: string; // compatibility alias
  role?: string;
  rating: number;
  stars: number; // compatibility alias
  reviewText: string;
  quote: string; // compatibility alias
  order: number;
  isActive: boolean;
  isPublished: boolean; // compatibility alias
  isDeleted: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>({
  clientName: { type: String, required: true },
  name: { type: String },
  clientPhoto: { type: String },
  photo: { type: String },
  companyName: { type: String, required: true },
  company: { type: String },
  role: { type: String },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  stars: { type: Number, min: 1, max: 5, default: 5 },
  reviewText: { type: String, required: true },
  quote: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

TestimonialSchema.pre('save', function () {
  if (this.clientName && !this.name) this.name = this.clientName;
  if (this.name && !this.clientName) this.clientName = this.name;

  if (this.clientPhoto && !this.photo) this.photo = this.clientPhoto;
  if (this.photo && !this.clientPhoto) this.clientPhoto = this.photo;

  if (this.companyName && !this.company) this.company = this.companyName;
  if (this.company && !this.companyName) this.companyName = this.company;

  if (this.rating && !this.stars) this.stars = this.rating;
  if (this.stars && !this.rating) this.rating = this.stars;

  if (this.reviewText && !this.quote) this.quote = this.reviewText;
  if (this.quote && !this.reviewText) this.reviewText = this.quote;

  if (this.isActive !== undefined && this.isPublished === undefined) {
    this.isPublished = this.isActive;
  }
  if (this.isPublished !== undefined && this.isActive === undefined) {
    this.isActive = this.isPublished;
  }
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
