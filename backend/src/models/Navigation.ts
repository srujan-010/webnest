import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Navigation', new Schema({ items: Array }, { strict: false }));
