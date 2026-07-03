"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const FooterContent_1 = __importDefault(require("../models/FooterContent"));
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const router = (0, express_1.Router)();
// GET footer
router.get('/', async (req, res) => {
    try {
        const footer = await FooterContent_1.default.findOne();
        if (!footer) {
            return res.status(404).json({ success: false, message: 'Footer content not found.' });
        }
        return res.status(200).json(footer);
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
// POST update footer
router.post('/', auth_1.protect, async (req, res) => {
    try {
        let footer = await FooterContent_1.default.findOne();
        if (!footer) {
            footer = await FooterContent_1.default.create(req.body);
        }
        else {
            Object.assign(footer, req.body);
            await footer.save();
        }
        await AuditLog_1.default.create({
            userId: req.user._id,
            userEmail: req.user.email,
            action: 'update',
            model: 'FooterContent',
            recordId: footer._id.toString(),
            summary: 'Updated site footer content',
        });
        return res.status(200).json({ success: true, data: footer });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
exports.default = router;
