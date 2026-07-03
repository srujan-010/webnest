import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import AuditLog from '../models/AuditLog';

const signToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any });

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await Admin.findOne({ email, isActive: true }).select('+password');
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
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getMe = async (req: any, res: Response) => {
  return res.status(200).json({ success: true, user: req.user });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('webnest_admin_token');
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }
    const admin = await Admin.create({ name, email, password, role: role || 'editor' });
    return res.status(201).json({ success: true, admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find({ isActive: true }).select('-password');
    return res.status(200).json({ success: true, data: admins });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
