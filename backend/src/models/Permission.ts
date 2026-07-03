import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Permission', new Schema({ name: String, description: String }));
