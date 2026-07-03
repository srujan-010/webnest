import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  photo?: string;
  name: string;
  role: string;
  bio?: string;
  skills: string[];
  color?: string;
  linkedin?: string;
  linkedIn?: string; // compatibility alias
  github?: string;
  email?: string;
  order: number;
  isActive: boolean;
  isDeleted: boolean;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  photo: { type: String },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  skills: [{ type: String }],
  color: { type: String },
  linkedin: { type: String },
  linkedIn: { type: String },
  github: { type: String },
  email: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

TeamMemberSchema.pre('save', function () {
  if (this.linkedin && !this.linkedIn) this.linkedIn = this.linkedin;
  if (this.linkedIn && !this.linkedin) this.linkedin = this.linkedIn;
});

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
