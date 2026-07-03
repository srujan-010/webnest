import mongoose, { Schema } from 'mongoose'; export default mongoose.model('SEO', new Schema({ page: String, meta: Object }, { strict: false }));
