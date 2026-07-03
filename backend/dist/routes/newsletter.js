"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const crudFactory_1 = require("../controllers/crudFactory");
const NewsletterSubscriber_1 = __importDefault(require("../models/NewsletterSubscriber"));
const router = (0, express_1.Router)();
const ctrl = (0, crudFactory_1.createCrudController)(NewsletterSubscriber_1.default, 'NewsletterSubscriber');
// Public route to subscribe
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }
        const existing = await NewsletterSubscriber_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'You are already subscribed.' });
        }
        const sub = await NewsletterSubscriber_1.default.create({ email });
        return res.status(201).json({ success: true, message: 'Subscribed successfully.', data: sub });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
});
// Admin protected routes
router.get('/', auth_1.protect, ctrl.getAll);
router.post('/', auth_1.protect, ctrl.create);
router.delete('/:id', auth_1.protect, ctrl.remove);
exports.default = router;
