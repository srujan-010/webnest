import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Media', new Schema({ url: String, publicId: String }, { strict: false }));
