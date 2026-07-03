import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Client', new Schema({ company: String, logo: String }, { strict: false }));
