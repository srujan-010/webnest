import mongoose, { Schema, Model } from 'mongoose';

export interface IAuditLog {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'restore' | 'publish' | 'reorder';
  model: string;
  recordId?: string;
  summary: string;
  diff?: Record<string, any>;
}

const AuditLogSchema = new Schema<IAuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  userEmail: { type: String, required: true },
  action: { type: String, enum: ['create', 'update', 'delete', 'restore', 'publish', 'reorder'], required: true },
  model: { type: String, required: true },
  recordId: { type: String },
  summary: { type: String, required: true },
  diff: { type: Schema.Types.Mixed },
}, { timestamps: true });

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ model: 1 });

const AuditLogModel: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLogModel;
