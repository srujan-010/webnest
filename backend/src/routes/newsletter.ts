import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createCrudController } from '../controllers/crudFactory';
import NewsletterSubscriber from '../models/NewsletterSubscriber';

const router = Router();
const ctrl = createCrudController(NewsletterSubscriber, 'NewsletterSubscriber');

// Public route to subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You are already subscribed.' });
    }
    const sub = await NewsletterSubscriber.create({ email });
    return res.status(201).json({ success: true, message: 'Subscribed successfully.', data: sub });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// Admin protected routes
router.get('/', protect, ctrl.getAll);
router.post('/', protect, ctrl.create);
router.delete('/:id', protect, ctrl.remove);

export default router;
