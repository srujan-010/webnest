import mongoose, { Schema, Document } from 'mongoose';

export interface IEngineeringStandard extends Document {
  title: string;
  description: string;
  icon: string;
  metric?: string;
  order: number;
  isDeleted: boolean;
}

const EngineeringStandardSchema = new Schema<IEngineeringStandard>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Code' },
  metric: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.EngineeringStandard || mongoose.model<IEngineeringStandard>('EngineeringStandard', EngineeringStandardSchema);
