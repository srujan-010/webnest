import mongoose, { Schema, Document } from 'mongoose';

export interface IProcessStep extends Document {
  title: string;
  desc: string;
  icon: string;
  order: number;
  duration?: string;
  deliverables?: string[];
  outcome?: string;
  isDeleted: boolean;
}

const ProcessStepSchema = new Schema<IProcessStep>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: 'Zap' },
  order: { type: Number, default: 0 },
  duration: { type: String },
  deliverables: { type: [String], default: [] },
  outcome: { type: String },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.ProcessStep || mongoose.model<IProcessStep>('ProcessStep', ProcessStepSchema);
