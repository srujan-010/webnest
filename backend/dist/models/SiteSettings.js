"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const SiteSettingsSchema = new mongoose_1.Schema({
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
    if (this.seoDefaults?.title && !this.siteTitle)
        this.siteTitle = this.seoDefaults.title;
    if (this.siteTitle && !this.seoDefaults?.title) {
        if (!this.seoDefaults)
            this.seoDefaults = { title: this.siteTitle, description: '' };
        else
            this.seoDefaults.title = this.siteTitle;
    }
    if (this.seoDefaults?.description && !this.metaDescription)
        this.metaDescription = this.seoDefaults.description;
    if (this.metaDescription && !this.seoDefaults?.description) {
        if (!this.seoDefaults)
            this.seoDefaults = { title: '', description: this.metaDescription };
        else
            this.seoDefaults.description = this.metaDescription;
    }
});
exports.default = mongoose_1.default.models.SiteSettings || mongoose_1.default.model('SiteSettings', SiteSettingsSchema);
