import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import Navigation from '../models/Navigation';
import AuditLog from '../models/AuditLog';

const router = Router();

// GET navigation
router.get('/', async (req: Request, res: Response) => {
  try {
    let nav = await Navigation.findOne();
    if (!nav) {
      // Return empty format if not seeded
      return res.status(200).json({ success: true, items: [] });
    }
    return res.status(200).json({ success: true, items: nav.items });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST update navigation
router.post('/', protect, async (req: any, res: Response) => {
  try {
    let nav = await Navigation.findOne();
    if (!nav) {
      nav = await Navigation.create({ items: req.body.items });
    } else {
      nav.items = req.body.items;
      await nav.save();
    }

    await AuditLog.create({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'update',
      model: 'Navigation',
      recordId: nav._id.toString(),
      summary: 'Updated site navigation links',
    });

    return res.status(200).json({ success: true, items: nav.items });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
