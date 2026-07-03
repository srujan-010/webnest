import dotenv from 'dotenv';
dotenv.config({ override: true });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db';

// Routes
import authRoutes from './routes/auth';
import heroRoutes from './routes/hero';
import heroShowcaseSettingsRoutes from './routes/heroShowcaseSettings';
import heroShowcaseItemsRoutes from './routes/heroShowcaseItems';
import projectRoutes from './routes/projects';
import serviceRoutes from './routes/services';
import testimonialRoutes from './routes/testimonials';
import teamRoutes from './routes/team';
import faqRoutes from './routes/faq';
import statsRoutes from './routes/stats';
import techstackRoutes from './routes/techstack';
import processRoutes from './routes/process';
import blogRoutes from './routes/blog';
import auditLogRoutes from './routes/auditLog';
import settingsRoutes from './routes/settings';
import uploadRoutes from './routes/upload';
import navigationRoutes from './routes/navigation';
import footerRoutes from './routes/footer';
import clientsRoutes from './routes/clients';
import whyUsRoutes from './routes/why-us';
import seoRoutes from './routes/seo';
import mediaRoutes from './routes/media';
import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Connect to MongoDB
connectDB();

// Secuity middleware
app.use(helmet());
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiter on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/hero-showcase-settings', heroShowcaseSettingsRoutes);
app.use('/api/hero-showcase-items', heroShowcaseItemsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/techstack', techstackRoutes);
app.use('/api/process', processRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/audit', auditLogRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/why-us', whyUsRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/media', mediaRoutes);
// Rate limiters for public forms
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many contact inquiries from this IP. Please try again later.' },
});

const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many newsletter signups from this IP. Please try again later.' },
});

app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/newsletter', newsletterLimiter, newsletterRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🚀 WebNest API server running on http://localhost:${PORT}`);
});

export default app;
