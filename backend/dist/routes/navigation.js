"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const Navigation_1 = __importDefault(require("../models/Navigation"));
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const router = (0, express_1.Router)();
// GET navigation
router.get('/', async (req, res) => {
    try {
        let nav = await Navigation_1.default.findOne();
        if (!nav) {
            // Return empty format if not seeded
            return res.status(200).json({ success: true, items: [] });
        }
        return res.status(200).json({ success: true, items: nav.items });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
// POST update navigation
router.post('/', auth_1.protect, async (req, res) => {
    try {
        let nav = await Navigation_1.default.findOne();
        if (!nav) {
            nav = await Navigation_1.default.create({ items: req.body.items });
        }
        else {
            nav.items = req.body.items;
            await nav.save();
        }
        await AuditLog_1.default.create({
            userId: req.user._id,
            userEmail: req.user.email,
            action: 'update',
            model: 'Navigation',
            recordId: nav._id.toString(),
            summary: 'Updated site navigation links',
        });
        return res.status(200).json({ success: true, items: nav.items });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
exports.default = router;
