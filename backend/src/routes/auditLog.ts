import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import AuditLog from '../models/AuditLog';

const router = Router();

router.get('/', protect, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 50, model } = req.query;
    const filter: Record<string, any> = {};
    if (model) filter.model = model;
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      AuditLog.countDocuments(filter),
    ]);
    return res.json({ success: true, data, total });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
