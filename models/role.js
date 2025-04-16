import mongoose from 'mongoose';

const { Schema } = mongoose;

const roleSchema = new Schema({
  role: String,
});

const role = mongoose.model('role', roleSchema);

export default role;
