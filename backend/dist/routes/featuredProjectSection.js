"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FeaturedProjectSection_1 = __importDefault(require("../models/FeaturedProjectSection"));
const auth_1 = require("../middlewares/auth");
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const router = express_1.default.Router();
const getOrCreateSection = async () => {
    let section = await FeaturedProjectSection_1.default.findOne();
    if (!section) {
        section = new FeaturedProjectSection_1.default();
        await section.save();
    }
    return section;
};
// Get published settings (public)
router.get('/', async (req, res) => {
    try {
        const section = await getOrCreateSection();
        res.json({ success: true, data: section.published });
    }
    catch (error) {
        console.error('Error fetching FeaturedProjectSection:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Get draft settings (admin)
router.get('/draft', auth_1.protect, async (req, res) => {
    try {
        const section = await getOrCreateSection();
        res.json({ success: true, data: section.draft });
    }
    catch (error) {
        console.error('Error fetching FeaturedProjectSection draft:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Update draft settings (admin)
router.put('/', auth_1.protect, async (req, res) => {
    try {
        const section = await getOrCreateSection();
        section.draft = { ...section.draft, ...req.body };
        await section.save();
        await AuditLog_1.default.create({
            userId: req.user._id, userEmail: req.user.email,
            action: 'update', model: 'FeaturedProjectSection', summary: 'Saved Featured Project Section draft',
        });
        res.json({ success: true, data: section.draft });
    }
    catch (error) {
        console.error('Error updating FeaturedProjectSection:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Publish settings (admin)
router.post('/publish', auth_1.protect, async (req, res) => {
    try {
        const section = await getOrCreateSection();
        section.published = section.draft;
        section.lastPublishedAt = new Date();
        await section.save();
        await AuditLog_1.default.create({
            userId: req.user._id, userEmail: req.user.email,
            action: 'publish', model: 'FeaturedProjectSection', summary: 'Published Featured Project Section live',
        });
        res.json({ success: true, data: section.published });
    }
    catch (error) {
        console.error('Error publishing FeaturedProjectSection:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.default = router;
