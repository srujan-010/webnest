"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAdmins = exports.createAdmin = exports.logout = exports.getMe = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const signToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') });
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }
        const user = await Admin_1.default.findOne({ email, isActive: true }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
        const accessToken = signToken(user._id.toString());
        // Set cookie
        res.cookie('webnest_admin_token', accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
            success: true,
            accessToken,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};
exports.getMe = getMe;
const logout = async (req, res) => {
    res.clearCookie('webnest_admin_token');
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};
exports.logout = logout;
const createAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await Admin_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already in use.' });
        }
        const admin = await Admin_1.default.create({ name, email, password, role: role || 'editor' });
        return res.status(201).json({ success: true, admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.createAdmin = createAdmin;
const listAdmins = async (req, res) => {
    try {
        const admins = await Admin_1.default.find({ isActive: true }).select('-password');
        return res.status(200).json({ success: true, data: admins });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.listAdmins = listAdmins;
