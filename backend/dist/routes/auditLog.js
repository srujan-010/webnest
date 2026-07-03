"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const router = (0, express_1.Router)();
router.get('/', auth_1.protect, async (req, res) => {
    try {
        const { page = 1, limit = 50, model } = req.query;
        const filter = {};
        if (model)
            filter.model = model;
        const skip = (Number(page) - 1) * Number(limit);
        const [data, total] = await Promise.all([
            AuditLog_1.default.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
            AuditLog_1.default.countDocuments(filter),
        ]);
        return res.json({ success: true, data, total });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
exports.default = router;
