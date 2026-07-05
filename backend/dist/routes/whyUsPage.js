"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WhyUsPage_1 = __importDefault(require("../models/WhyUsPage"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Helper to get or create the singleton
const getOrCreateWhyUsPage = async () => {
    let page = await WhyUsPage_1.default.findOne();
    if (!page) {
        page = new WhyUsPage_1.default();
        await page.save();
    }
    return page;
};
// Get published WhyUsPage content (public)
router.get('/', async (req, res) => {
    try {
        const page = await getOrCreateWhyUsPage();
        res.json({ success: true, data: page.published });
    }
    catch (error) {
        console.error('Error fetching WhyUsPage:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Get draft WhyUsPage content (admin)
router.get('/draft', auth_1.protect, async (req, res) => {
    try {
        const page = await getOrCreateWhyUsPage();
        res.json({ success: true, data: page.draft });
    }
    catch (error) {
        console.error('Error fetching WhyUsPage draft:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Update draft WhyUsPage content (admin)
router.put('/', auth_1.protect, async (req, res) => {
    try {
        const page = await getOrCreateWhyUsPage();
        page.draft = { ...page.draft, ...req.body };
        await page.save();
        res.json({ success: true, data: page.draft });
    }
    catch (error) {
        console.error('Error updating WhyUsPage:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Publish WhyUsPage content (admin)
router.post('/publish', auth_1.protect, async (req, res) => {
    try {
        const page = await getOrCreateWhyUsPage();
        page.published = page.draft;
        page.lastPublishedAt = new Date();
        await page.save();
        res.json({ success: true, data: page.published });
    }
    catch (error) {
        console.error('Error publishing WhyUsPage:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.default = router;
