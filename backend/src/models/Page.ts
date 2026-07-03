import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Page', new Schema({ title: String, slug: String, content: String }, { strict: false }));
