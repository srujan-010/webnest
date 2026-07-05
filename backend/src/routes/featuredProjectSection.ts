import express from 'express';
import FeaturedProjectSection from '../models/FeaturedProjectSection';
import { protect } from '../middlewares/auth';
import AuditLog from '../models/AuditLog';

const router = express.Router();

const getOrCreateSection = async () => {
  let section = await FeaturedProjectSection.findOne();
  if (!section) {
    section = new FeaturedProjectSection();
    await section.save();
  }
  return section;
};

// Get published settings (public)
router.get('/', async (req, res) => {
  try {
    const section = await getOrCreateSection();
    res.json({ success: true, data: section.published });
  } catch (error) {
    console.error('Error fetching FeaturedProjectSection:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get draft settings (admin)
router.get('/draft', protect, async (req, res) => {
  try {
    const section = await getOrCreateSection();
    res.json({ success: true, data: section.draft });
  } catch (error) {
    console.error('Error fetching FeaturedProjectSection draft:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update draft settings (admin)
router.put('/', protect, async (req: any, res) => {
  try {
    const section = await getOrCreateSection();
    section.draft = { ...section.draft, ...req.body };
    await section.save();
    
    await AuditLog.create({
      userId: req.user._id, userEmail: req.user.email,
      action: 'update', model: 'FeaturedProjectSection', summary: 'Saved Featured Project Section draft',
    });

    res.json({ success: true, data: section.draft });
  } catch (error) {
    console.error('Error updating FeaturedProjectSection:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Publish settings (admin)
router.post('/publish', protect, async (req: any, res) => {
  try {
    const section = await getOrCreateSection();
    section.published = section.draft;
    section.lastPublishedAt = new Date();
    await section.save();
    
    await AuditLog.create({
      userId: req.user._id, userEmail: req.user.email,
      action: 'publish', model: 'FeaturedProjectSection', summary: 'Published Featured Project Section live',
    });

    res.json({ success: true, data: section.published });
  } catch (error) {
    console.error('Error publishing FeaturedProjectSection:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
