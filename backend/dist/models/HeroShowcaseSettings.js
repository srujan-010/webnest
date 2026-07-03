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
const HeroShowcaseSettingsSchema = new mongoose_1.Schema({
    autoPlay: { type: Boolean, default: true },
    autoPlayInterval: { type: Number, default: 4500 },
    infiniteLoop: { type: Boolean, default: true },
    transitionType: { type: String, enum: ['fade', 'slide'], default: 'fade' },
    transitionSpeed: { type: Number, default: 400 },
    showNavigation: { type: Boolean, default: true },
    showIndicators: { type: Boolean, default: true },
    browserWindowStyle: { type: String, enum: ['macOS', 'generic', 'minimal'], default: 'macOS' },
    desktopWidth: { type: String, default: '100%' },
    desktopHeight: { type: String, default: 'auto' },
    mobileLayout: { type: String, enum: ['stack', 'carousel', 'hidden'], default: 'carousel' },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date },
}, { timestamps: true });
exports.default = mongoose_1.default.models.HeroShowcaseSettings || mongoose_1.default.model('HeroShowcaseSettings', HeroShowcaseSettingsSchema);
