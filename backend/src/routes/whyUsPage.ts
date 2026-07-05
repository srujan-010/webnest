import express from 'express';
import WhyUsPage from '../models/WhyUsPage';
import { protect } from '../middlewares/auth';

const router = express.Router();

// Helper to get or create the singleton
const getOrCreateWhyUsPage = async () => {
  let page = await WhyUsPage.findOne();
  if (!page) {
    page = new WhyUsPage();
    await page.save();
  }
  return page;
};

// Get published WhyUsPage content (public)
router.get('/', async (req, res) => {
  try {
    const page = await getOrCreateWhyUsPage();
    res.json({ success: true, data: page.published });
  } catch (error) {
    console.error('Error fetching WhyUsPage:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get draft WhyUsPage content (admin)
router.get('/draft', protect, async (req, res) => {
  try {
    const page = await getOrCreateWhyUsPage();
    res.json({ success: true, data: page.draft });
  } catch (error) {
    console.error('Error fetching WhyUsPage draft:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update draft WhyUsPage content (admin)
router.put('/', protect, async (req, res) => {
  try {
    const page = await getOrCreateWhyUsPage();
    page.draft = { ...page.draft, ...req.body };
    await page.save();
    res.json({ success: true, data: page.draft });
  } catch (error) {
    console.error('Error updating WhyUsPage:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Publish WhyUsPage content (admin)
router.post('/publish', protect, async (req, res) => {
  try {
    const page = await getOrCreateWhyUsPage();
    page.published = page.draft;
    page.lastPublishedAt = new Date();
    await page.save();
    res.json({ success: true, data: page.published });
  } catch (error) {
    console.error('Error publishing WhyUsPage:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
