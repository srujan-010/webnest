import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Setting', new Schema({ key: String, value: Schema.Types.Mixed }, { strict: false }));
