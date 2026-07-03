import mongoose, { Schema, Document } from 'mongoose';

export interface IStat extends Document {
  value: number;
  suffix: string;
  label: string;
  order: number;
  isDeleted: boolean;
}

const StatSchema = new Schema<IStat>({
  value: { type: Number, required: true },
  suffix: { type: String, default: '+' },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Stat || mongoose.model<IStat>('Stat', StatSchema);
