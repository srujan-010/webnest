import mongoose, { Schema, Document } from 'mongoose';

interface ILink { label: string; url: string; }
interface ISocialLink { platform: string; url: string; }

export interface IFooterContent extends Document {
  description: string;
  quickLinks: ILink[];
  servicesLinks: ILink[];
  companyLinks: ILink[];
  socialLinks: ISocialLink[];
  newsletterEnabled: boolean;
  copyright: string;
}

const FooterContentSchema = new Schema<IFooterContent>({
  description: { type: String, default: 'Building premium digital experiences for ambitious businesses.' },
  quickLinks: [{ label: String, url: String }],
  servicesLinks: [{ label: String, url: String }],
  companyLinks: [{ label: String, url: String }],
  socialLinks: [{ platform: String, url: String }],
  newsletterEnabled: { type: Boolean, default: false },
  copyright: { type: String, default: '© 2024 WebNest. All rights reserved.' },
}, { timestamps: true });

export default mongoose.models.FooterContent || mongoose.model<IFooterContent>('FooterContent', FooterContentSchema);
