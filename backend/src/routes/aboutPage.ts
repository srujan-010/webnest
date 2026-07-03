import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import AboutPage from '../models/AboutPage';
import AuditLog from '../models/AuditLog';

const router = Router();

// GET published about page (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    let aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
      aboutPage = await AboutPage.create({});
    }
    return res.json({ success: true, data: aboutPage.published });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET draft about page (Admin only)
router.get('/draft', protect, async (req: Request, res: Response) => {
  try {
    let aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
      aboutPage = await AboutPage.create({});
    }
    return res.json({ success: true, data: aboutPage.draft });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT save draft about page (Admin only)
router.put('/draft', protect, async (req: any, res: Response) => {
  try {
    let aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
      aboutPage = await AboutPage.create({});
    }
    
    aboutPage.draft = req.body;
    await aboutPage.save();

    await AuditLog.create({
      userId: req.user._id, userEmail: req.user.email,
      action: 'update', model: 'AboutPage', summary: 'Saved About Page draft',
    });

    return res.json({ success: true, data: aboutPage.draft, message: 'Draft saved successfully' });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// POST publish about page (Admin only)
router.post('/publish', protect, async (req: any, res: Response) => {
  try {
    let aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
      return res.status(404).json({ success: false, message: 'No draft found to publish' });
    }

    aboutPage.published = aboutPage.draft;
    aboutPage.lastPublishedAt = new Date();
    await aboutPage.save();

    await AuditLog.create({
      userId: req.user._id, userEmail: req.user.email,
      action: 'publish', model: 'AboutPage', summary: 'Published About Page live',
    });

    return res.json({ success: true, data: aboutPage.published, message: 'Published successfully' });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
