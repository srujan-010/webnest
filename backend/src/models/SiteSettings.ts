import mongoose, { Schema, Document } from 'mongoose';

interface INavItem { label: string; url: string; order: number; }
interface IHeaderCta { label: string; link: string; }

export interface ISiteSettings extends Document {
  heroHeading: string;
  heroSubheading: string;
  statsCounters: Array<{ label: string; value: number; suffix: string }>;
  contactEmail: string;
  contactPhone: string;
  address: string;
  mapEmbedUrl: string;
  whatsappNumber: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    ogImage?: string;
  };
  aboutText: string;
  footerText: string;
  navItems?: Array<{ label: string; url: string; order: number }>;
  headerCta?: { label: string; link: string };

  // Legacy fields kept for seamless migration
  siteTitle?: string;
  metaDescription?: string;
  defaultOgImage?: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  heroHeading: { type: String, default: 'Crafting Digital Experiences That Drive Business Growth' },
  heroSubheading: { type: String, default: 'We build premium software solutions, web applications, and digital platforms that help brands scale and succeed.' },
  statsCounters: [{
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '+' }
  }],
  contactEmail: { type: String, default: 'hello@webnest.agency' },
  contactPhone: { type: String, default: '+1 (555) 000-0000' },
  address: { type: String, default: '123 Agency Blvd, Tech City' },
  mapEmbedUrl: { type: String, default: '' },
  whatsappNumber: { type: String, default: '' },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
  seoDefaults: {
    title: { type: String, default: 'WebNest — Premium Software & Design Agency' },
    description: { type: String, default: 'We design and build premium web applications, e-commerce stores, and software solutions.' },
    ogImage: { type: String, default: '' }
  },
  aboutText: { type: String, default: 'We are a team of expert engineers, designers, and strategists dedicated to delivering elite software products.' },
  footerText: { type: String, default: '© 2026 WebNest Agency. All rights reserved.' },
  navItems: [{ label: String, url: String, order: Number }],
  headerCta: { label: { type: String, default: 'Start Project' }, link: { type: String, default: '/contact' } },

  // Compatibility fields
  siteTitle: { type: String },
  metaDescription: { type: String },
  defaultOgImage: { type: String },
}, { timestamps: true });

SiteSettingsSchema.pre('save', function () {
  if (this.seoDefaults?.title && !this.siteTitle) this.siteTitle = this.seoDefaults.title;
  if (this.siteTitle && !this.seoDefaults?.title) {
    if (!this.seoDefaults) this.seoDefaults = { title: this.siteTitle, description: '' };
    else this.seoDefaults.title = this.siteTitle;
  }

  if (this.seoDefaults?.description && !this.metaDescription) this.metaDescription = this.seoDefaults.description;
  if (this.metaDescription && !this.seoDefaults?.description) {
    if (!this.seoDefaults) this.seoDefaults = { title: '', description: this.metaDescription };
    else this.seoDefaults.description = this.metaDescription;
  }
});

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
