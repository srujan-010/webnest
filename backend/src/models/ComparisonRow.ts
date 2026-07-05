import mongoose, { Schema, Document } from 'mongoose';

export interface IComparisonRow extends Document {
  criteria: string;
  typicalAgencyText: string;
  webnestText: string;
  order: number;
  isActive: boolean;
  isDeleted: boolean;
}

const ComparisonRowSchema = new Schema<IComparisonRow>({
  criteria: { type: String, required: true },
  typicalAgencyText: { type: String, required: true },
  webnestText: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.ComparisonRow || mongoose.model<IComparisonRow>('ComparisonRow', ComparisonRowSchema);
