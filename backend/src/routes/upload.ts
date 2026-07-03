import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ override: true });
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Media from '../models/Media';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'webnest',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  } as any,
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.post('/', protect, (req: Request, res: Response, next) => {
  console.log('📬 [Upload] Request received: POST /api/upload');
  console.log('📝 [Upload] Env API Key:', process.env.CLOUDINARY_API_KEY);
  console.log('📝 [Upload] Env Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('📝 [Upload] Env URL:', process.env.CLOUDINARY_URL);
  
  // 1. Check configuration
  const missingConfig = [];
  if (!process.env.CLOUDINARY_CLOUD_NAME) missingConfig.push('CLOUDINARY_CLOUD_NAME');
  if (!process.env.CLOUDINARY_API_KEY) missingConfig.push('CLOUDINARY_API_KEY');
  if (!process.env.CLOUDINARY_API_SECRET) missingConfig.push('CLOUDINARY_API_SECRET');

  if (missingConfig.length > 0) {
    console.error('❌ [Upload] Missing configuration variables:', missingConfig);
    return res.status(500).json({
      success: false,
      message: `Cloudinary configuration missing: ${missingConfig.join(', ')}`
    });
  }

  console.log('⚙️ [Upload] Cloudinary config verified. Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('🚀 [Upload] Initializing Multer parser...');

  // 2. Wrap Multer middleware to intercept errors gracefully
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('❌ [Upload] Multer parsing failed:', err.message);
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload parsing error.'
      });
    }
    console.log('✅ [Upload] Multer parsed file successfully.');
    next();
  });
}, async (req: Request, res: Response) => {
  // 3. File detected check
  if (!req.file) {
    console.warn('⚠️ [Upload] No file detected in request.');
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const file = req.file as any;
  console.log('📁 [Upload] Full Multer/Cloudinary file object:', JSON.stringify(file, null, 2));
  
  const url = file.secure_url || file.path;
  const publicId = file.filename || file.public_id;

  try {
    console.log('💾 [Upload] Saving media reference to database...');
    const media = await Media.create({ url, publicId });
    console.log('✅ [Upload] Database record synchronized. ID:', media._id);
    console.log('📤 [Upload] Returning success response with URL:', media.url);
    return res.status(200).json({
      success: true,
      url: media.url,
      publicId: media.publicId,
    });
  } catch (err: any) {
    console.error('❌ [Upload] Database save failed:', err.message);
    return res.status(500).json({ success: false, message: `Database reference error: ${err.message}` });
  }
});

export default router;
