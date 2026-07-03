import mongoose, { Schema, Document } from 'mongoose';

export interface ITechStackItem extends Document {
  name: string;
  logo?: string;
  Icon?: string; // compatibility alias
  category: 'frontend' | 'backend' | 'db' | 'tools';
  order: number;
  isDeleted: boolean;
}

const TechStackItemSchema = new Schema<ITechStackItem>({
  name: { type: String, required: true },
  logo: { type: String },
  Icon: { type: String },
  category: { type: String, enum: ['frontend', 'backend', 'db', 'tools'], default: 'frontend' },
  order: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

TechStackItemSchema.pre('save', function () {
  if (this.logo && !this.Icon) this.Icon = this.logo;
  if (this.Icon && !this.logo) this.logo = this.Icon;
});

export default mongoose.models.TechStackItem || mongoose.model<ITechStackItem>('TechStackItem', TechStackItemSchema);
