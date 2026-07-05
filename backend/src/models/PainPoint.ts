import mongoose, { Schema, Document } from 'mongoose';

export interface IPainPoint extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  isDeleted: boolean;
}

const PainPointSchema = new Schema<IPainPoint>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'AlertTriangle' },
  order: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.PainPoint || mongoose.model<IPainPoint>('PainPoint', PainPointSchema);
