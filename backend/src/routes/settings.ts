import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import SiteSettings from '../models/SiteSettings';
import AuditLog from '../models/AuditLog';

const router = Router();

// GET single settings document (upsert on read)
router.get('/', async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return res.json({ success: true, data: settings });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST/UPDATE settings (always updates the single document)
router.post('/', protect, async (req: any, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    await AuditLog.create({
      userId: req.user._id, userEmail: req.user.email,
      action: 'update', model: 'SiteSettings', summary: 'Updated site settings',
    });
    return res.json({ success: true, data: settings });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
