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
const BlogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String },
    contentRichText: { type: String, default: '' },
    body: { type: String, default: '' },
    coverImage: { type: String },
    author: { type: mongoose_1.Schema.Types.Mixed, required: true }, // Mixed to allow both ref ObjectId and legacy string name
    publishedAt: { type: Date },
    publishedDate: { type: Date },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    readTimeMinutes: { type: Number, default: 3 },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoDesc: { type: String },
    status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    scheduledAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
BlogPostSchema.pre('save', function () {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    // Sync contentRichText and body
    if (this.contentRichText && !this.body)
        this.body = this.contentRichText;
    if (this.body && !this.contentRichText)
        this.contentRichText = this.body;
    // Sync seoDescription and seoDesc
    if (this.seoDescription && !this.seoDesc)
        this.seoDesc = this.seoDescription;
    if (this.seoDesc && !this.seoDescription)
        this.seoDescription = this.seoDesc;
    // Sync dates
    if (this.publishedAt && !this.publishedDate)
        this.publishedDate = this.publishedAt;
    if (this.publishedDate && !this.publishedAt)
        this.publishedAt = this.publishedDate;
    // Sync excerpt from body if missing
    if (!this.excerpt && this.body) {
        this.excerpt = this.body.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }
});
exports.default = mongoose_1.default.models.BlogPost || mongoose_1.default.model('BlogPost', BlogPostSchema);
