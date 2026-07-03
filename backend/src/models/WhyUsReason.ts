import mongoose, { Schema, Document } from 'mongoose';

export interface IWhyUsReason extends Document {
  title: string;
  text: string;
  order: number;
  isDeleted: boolean;
}

const WhyUsReasonSchema = new Schema<IWhyUsReason>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.WhyUsReason || mongoose.model<IWhyUsReason>('WhyUsReason', WhyUsReasonSchema);
