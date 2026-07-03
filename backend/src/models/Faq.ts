import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  order: number;
  category?: string;
  isActive: boolean;
  isDeleted: boolean;
}

const FaqSchema = new Schema<IFaq>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  category: { type: String, default: 'General' },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);
