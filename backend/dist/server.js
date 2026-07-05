"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ override: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_1 = require("./config/db");
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
const hero_1 = __importDefault(require("./routes/hero"));
const heroShowcaseSettings_1 = __importDefault(require("./routes/heroShowcaseSettings"));
const heroShowcaseItems_1 = __importDefault(require("./routes/heroShowcaseItems"));
const projects_1 = __importDefault(require("./routes/projects"));
const services_1 = __importDefault(require("./routes/services"));
const testimonials_1 = __importDefault(require("./routes/testimonials"));
const team_1 = __importDefault(require("./routes/team"));
const faq_1 = __importDefault(require("./routes/faq"));
const stats_1 = __importDefault(require("./routes/stats"));
const techstack_1 = __importDefault(require("./routes/techstack"));
const process_1 = __importDefault(require("./routes/process"));
const blog_1 = __importDefault(require("./routes/blog"));
const auditLog_1 = __importDefault(require("./routes/auditLog"));
const settings_1 = __importDefault(require("./routes/settings"));
const upload_1 = __importDefault(require("./routes/upload"));
const navigation_1 = __importDefault(require("./routes/navigation"));
const footer_1 = __importDefault(require("./routes/footer"));
const clients_1 = __importDefault(require("./routes/clients"));
const why_us_1 = __importDefault(require("./routes/why-us"));
const whyUsPage_1 = __importDefault(require("./routes/whyUsPage"));
const seo_1 = __importDefault(require("./routes/seo"));
const media_1 = __importDefault(require("./routes/media"));
const contact_1 = __importDefault(require("./routes/contact"));
const newsletter_1 = __importDefault(require("./routes/newsletter"));
const aboutPage_1 = __importDefault(require("./routes/aboutPage"));
const featuredProjectSection_1 = __importDefault(require("./routes/featuredProjectSection"));
const painPoints_1 = __importDefault(require("./routes/painPoints"));
const engineeringStandards_1 = __importDefault(require("./routes/engineeringStandards"));
const comparisonRows_1 = __importDefault(require("./routes/comparisonRows"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
// Connect to MongoDB
(0, db_1.connectDB)();
// Secuity middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: [CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001', 'https://webnestindia.netlify.app'],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Rate limiter on auth routes
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many requests. Please try again later.' },
});
// API Routes
app.use('/api/auth', authLimiter, auth_1.default);
app.use('/api/hero', hero_1.default);
app.use('/api/hero-showcase-settings', heroShowcaseSettings_1.default);
app.use('/api/hero-showcase-items', heroShowcaseItems_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/services', services_1.default);
app.use('/api/testimonials', testimonials_1.default);
app.use('/api/team', team_1.default);
app.use('/api/faq', faq_1.default);
app.use('/api/stats', stats_1.default);
app.use('/api/techstack', techstack_1.default);
app.use('/api/process', process_1.default);
app.use('/api/blog', blog_1.default);
app.use('/api/audit', auditLog_1.default);
app.use('/api/settings', settings_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/navigation', navigation_1.default);
app.use('/api/footer', footer_1.default);
app.use('/api/clients', clients_1.default);
app.use('/api/why-us', why_us_1.default); // legacy
app.use('/api/why-us-page', whyUsPage_1.default);
app.use('/api/seo', seo_1.default);
app.use('/api/media', media_1.default);
app.use('/api/about-page', aboutPage_1.default);
app.use('/api/featured-project-section', featuredProjectSection_1.default);
app.use('/api/pain-points', painPoints_1.default);
app.use('/api/engineering-standards', engineeringStandards_1.default);
app.use('/api/comparison-rows', comparisonRows_1.default);
// Rate limiters for public forms
const contactLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many contact inquiries from this IP. Please try again later.' },
});
const newsletterLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many newsletter signups from this IP. Please try again later.' },
});
app.use('/api/contact', contactLimiter, contact_1.default);
app.use('/api/newsletter', newsletterLimiter, newsletter_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error.' });
});
app.listen(PORT, () => {
    console.log(`🚀 WebNest API server running on http://localhost:${PORT}`);
});
exports.default = app;
