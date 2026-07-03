import mongoose, { Schema, Document } from 'mongoose';

export interface IProcessStep extends Document {
  title: string;
  desc: string;
  icon: string;
  order: number;
  isDeleted: boolean;
}

const ProcessStepSchema = new Schema<IProcessStep>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: 'Zap' },
  order: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.ProcessStep || mongoose.model<IProcessStep>('ProcessStep', ProcessStepSchema);
