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
const ServiceSchema = new mongoose_1.Schema({
    icon: { type: String, default: 'Code2' },
    title: { type: String, required: true },
    slug: { type: String },
    shortDescription: { type: String, required: true },
    description: { type: String },
    longDescription: { type: String },
    link: { type: String, default: '/services' },
    className: { type: String },
    iconClass: { type: String },
    textClass: { type: String },
    buttonClass: { type: String },
    large: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
ServiceSchema.pre('save', function () {
    if (!this.slug && this.title) {
        this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (this.shortDescription && !this.description) {
        this.description = this.shortDescription;
    }
    if (this.description && !this.shortDescription) {
        this.shortDescription = this.description;
    }
    if (this.isActive !== undefined && this.isPublished === undefined) {
        this.isPublished = this.isActive;
    }
    if (this.isPublished !== undefined && this.isActive === undefined) {
        this.isActive = this.isPublished;
    }
});
exports.default = mongoose_1.default.models.Service || mongoose_1.default.model('Service', ServiceSchema);
