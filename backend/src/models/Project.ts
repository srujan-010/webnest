import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  name: string; // compatibility alias
  slug: string;
  category: string; // compatibility alias
  categories: string[];
  shortDescription: string;
  description: string; // compatibility alias
  longDescription?: string;
  desktopImage?: string;
  image?: string; // compatibility alias
  mobileImage?: string;
  thumbnail?: string;
  coverImage?: string;
  gallery: string[];
  galleryImages?: string[];
  liveUrl?: string;
  websiteUrl?: string; // compatibility alias
  caseStudyUrl?: string;
  caseStudyContent?: string;
  isFeatured: boolean;
  featuresList: string[];
  features: string[]; // compatibility alias
  techStack: string[];
  tech: string[]; // compatibility alias
  color: string;
  accent: string;
  order: number;
  status: 'draft' | 'published';
  isDeleted: boolean;
  deletedAt?: Date;
  clientName?: string;
  clientLogo?: string;
  completionYear?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  testimonialCompany?: string;
  testimonialPhoto?: string;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  name: { type: String },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String },
  categories: [{ type: String }],
  shortDescription: { type: String, required: true },
  description: { type: String },
  longDescription: { type: String },
  desktopImage: { type: String },
  image: { type: String },
  mobileImage: { type: String },
  thumbnail: { type: String },
  coverImage: { type: String },
  gallery: [{ type: String }],
  galleryImages: [{ type: String }],
  liveUrl: { type: String },
  websiteUrl: { type: String },
  caseStudyUrl: { type: String },
  caseStudyContent: { type: String },
  isFeatured: { type: Boolean, default: false },
  featuresList: [{ type: String }],
  features: [{ type: String }],
  techStack: [{ type: String }],
  tech: [{ type: String }],
  color: { type: String, default: '#2563EB' },
  accent: { type: String, default: '#2563EB' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  clientName: { type: String },
  clientLogo: { type: String },
  completionYear: { type: String },
  challenge: { type: String },
  solution: { type: String },
  results: [{ type: String }],
  testimonialQuote: { type: String },
  testimonialAuthor: { type: String },
  testimonialRole: { type: String },
  testimonialCompany: { type: String },
  testimonialPhoto: { type: String },
}, { timestamps: true });

ProjectSchema.pre('save', function () {
  // Sync title and name
  if (this.isModified('title') && this.title) {
    this.name = this.title;
  } else if (this.isModified('name') && this.name) {
    this.title = this.name;
  } else {
    if (this.title && !this.name) this.name = this.title;
    if (this.name && !this.title) this.title = this.name;
  }

  // Sync slug
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  // Sync shortDescription and description
  if (this.isModified('shortDescription') && this.shortDescription) {
    this.description = this.shortDescription;
  } else if (this.isModified('description') && this.description) {
    this.shortDescription = this.description;
  } else {
    if (this.shortDescription && !this.description) this.description = this.shortDescription;
    if (this.description && !this.shortDescription) this.shortDescription = this.description;
  }

  // Sync desktopImage and image
  if (this.isModified('desktopImage') && this.desktopImage) {
    this.image = this.desktopImage;
  } else if (this.isModified('image') && this.image) {
    this.desktopImage = this.image;
  }

  // Sync thumbnail
  if (this.isModified('thumbnail') && this.thumbnail) {
    this.image = this.thumbnail;
    this.desktopImage = this.thumbnail;
  } else {
    if (this.desktopImage && !this.thumbnail) this.thumbnail = this.desktopImage;
    if (this.image && !this.thumbnail) this.thumbnail = this.image;
    if (this.thumbnail && !this.image) this.image = this.thumbnail;
    if (this.thumbnail && !this.desktopImage) this.desktopImage = this.thumbnail;
  }

  // Sync coverImage
  if (this.isModified('coverImage') && this.coverImage) {
    this.image = this.coverImage;
    this.desktopImage = this.coverImage;
  } else {
    if (this.desktopImage && !this.coverImage) this.coverImage = this.desktopImage;
    if (this.image && !this.coverImage) this.coverImage = this.image;
    if (this.coverImage && !this.image) this.image = this.coverImage;
    if (this.coverImage && !this.desktopImage) this.desktopImage = this.coverImage;
  }

  // Sync gallery and galleryImages
  if (this.isModified('galleryImages') && this.galleryImages) {
    this.gallery = this.galleryImages;
  } else if (this.isModified('gallery') && this.gallery) {
    this.galleryImages = this.gallery;
  } else {
    if (this.galleryImages && this.galleryImages.length && (!this.gallery || !this.gallery.length)) this.gallery = this.galleryImages;
    if (this.gallery && this.gallery.length && (!this.galleryImages || !this.galleryImages.length)) this.galleryImages = this.gallery;
  }

  // Sync liveUrl and websiteUrl
  if (this.isModified('liveUrl') && this.liveUrl) {
    this.websiteUrl = this.liveUrl;
  } else if (this.isModified('websiteUrl') && this.websiteUrl) {
    this.liveUrl = this.websiteUrl;
  } else {
    if (this.liveUrl && !this.websiteUrl) this.websiteUrl = this.liveUrl;
    if (this.websiteUrl && !this.liveUrl) this.liveUrl = this.websiteUrl;
  }

  // Sync arrays
  if (this.techStack && this.techStack.length && (!this.tech || !this.tech.length)) this.tech = this.techStack;
  if (this.tech && this.tech.length && (!this.techStack || !this.techStack.length)) this.techStack = this.tech;

  if (this.featuresList && this.featuresList.length && (!this.features || !this.features.length)) this.features = this.featuresList;
  if (this.features && this.features.length && (!this.featuresList || !this.featuresList.length)) this.featuresList = this.features;

  if (this.categories && this.categories.length && !this.category) this.category = this.categories[0];
  if (this.category && (!this.categories || !this.categories.length)) this.categories = [this.category];
});

const ProjectModel: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default ProjectModel;
