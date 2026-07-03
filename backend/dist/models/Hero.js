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
const HeroSchema = new mongoose_1.Schema({
    badge: { type: String, default: 'Premium Software Agency' },
    headline: { type: String, required: true },
    headlineHighlight: { type: String },
    subheadline: { type: String },
    primaryCta: {
        label: { type: String, default: 'Start Your Project' },
        link: {
            type: String,
            default: '/contact',
            validate: {
                validator: function (v) {
                    if (!v)
                        return true;
                    return v.startsWith('/') || v.startsWith('http://') || v.startsWith('https://');
                },
                message: 'Enter a valid internal route (/contact) or a full URL (https://example.com).'
            }
        }
    },
    secondaryCta: {
        label: { type: String, default: 'View Our Work' },
        link: {
            type: String,
            default: '/portfolio',
            validate: {
                validator: function (v) {
                    if (!v)
                        return true;
                    return v.startsWith('/') || v.startsWith('http://') || v.startsWith('https://');
                },
                message: 'Enter a valid internal route (/contact) or a full URL (https://example.com).'
            }
        }
    },
    logoStrip: [{ image: String, label: String, link: String, order: { type: Number, default: 0 } }],
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Hero || mongoose_1.default.model('Hero', HeroSchema);
