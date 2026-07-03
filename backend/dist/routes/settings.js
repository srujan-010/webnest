"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const router = (0, express_1.Router)();
// GET single settings document (upsert on read)
router.get('/', async (req, res) => {
    try {
        let settings = await SiteSettings_1.default.findOne();
        if (!settings) {
            settings = await SiteSettings_1.default.create({});
        }
        return res.json({ success: true, data: settings });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
// POST/UPDATE settings (always updates the single document)
router.post('/', auth_1.protect, async (req, res) => {
    try {
        let settings = await SiteSettings_1.default.findOne();
        if (!settings) {
            settings = await SiteSettings_1.default.create(req.body);
        }
        else {
            Object.assign(settings, req.body);
            await settings.save();
        }
        await AuditLog_1.default.create({
            userId: req.user._id, userEmail: req.user.email,
            action: 'update', model: 'SiteSettings', summary: 'Updated site settings',
        });
        return res.json({ success: true, data: settings });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
exports.default = router;
