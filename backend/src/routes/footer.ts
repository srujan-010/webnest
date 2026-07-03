import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import FooterContent from '../models/FooterContent';
import AuditLog from '../models/AuditLog';

const router = Router();

// GET footer
router.get('/', async (req: Request, res: Response) => {
  try {
    const footer = await FooterContent.findOne();
    if (!footer) {
      return res.status(404).json({ success: false, message: 'Footer content not found.' });
    }
    return res.status(200).json(footer);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST update footer
router.post('/', protect, async (req: any, res: Response) => {
  try {
    let footer = await FooterContent.findOne();
    if (!footer) {
      footer = await FooterContent.create(req.body);
    } else {
      Object.assign(footer, req.body);
      await footer.save();
    }

    await AuditLog.create({
      userId: req.user._id,
      userEmail: req.user.email,
      action: 'update',
      model: 'FooterContent',
      recordId: footer._id.toString(),
      summary: 'Updated site footer content',
    });

    return res.status(200).json({ success: true, data: footer });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
