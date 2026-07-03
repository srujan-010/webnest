import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Role', new Schema({ name: String, permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }] }));
