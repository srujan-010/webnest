"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const AboutPage_1 = __importDefault(require("../models/AboutPage"));
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const router = (0, express_1.Router)();
// GET published about page (Public)
router.get('/', async (req, res) => {
    try {
        let aboutPage = await AboutPage_1.default.findOne();
        if (!aboutPage) {
            aboutPage = await AboutPage_1.default.create({});
        }
        return res.json({ success: true, data: aboutPage.published });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
// GET draft about page (Admin only)
router.get('/draft', auth_1.protect, async (req, res) => {
    try {
        let aboutPage = await AboutPage_1.default.findOne();
        if (!aboutPage) {
            aboutPage = await AboutPage_1.default.create({});
        }
        return res.json({ success: true, data: aboutPage.draft });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
// PUT save draft about page (Admin only)
router.put('/draft', auth_1.protect, async (req, res) => {
    try {
        let aboutPage = await AboutPage_1.default.findOne();
        if (!aboutPage) {
            aboutPage = await AboutPage_1.default.create({});
        }
        aboutPage.draft = req.body;
        await aboutPage.save();
        await AuditLog_1.default.create({
            userId: req.user._id, userEmail: req.user.email,
            action: 'update', model: 'AboutPage', summary: 'Saved About Page draft',
        });
        return res.json({ success: true, data: aboutPage.draft, message: 'Draft saved successfully' });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
// POST publish about page (Admin only)
router.post('/publish', auth_1.protect, async (req, res) => {
    try {
        let aboutPage = await AboutPage_1.default.findOne();
        if (!aboutPage) {
            return res.status(404).json({ success: false, message: 'No draft found to publish' });
        }
        aboutPage.published = aboutPage.draft;
        aboutPage.lastPublishedAt = new Date();
        await aboutPage.save();
        await AuditLog_1.default.create({
            userId: req.user._id, userEmail: req.user.email,
            action: 'publish', model: 'AboutPage', summary: 'Published About Page live',
        });
        return res.json({ success: true, data: aboutPage.published, message: 'Published successfully' });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
exports.default = router;
