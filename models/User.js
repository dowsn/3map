import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default mongoose.model('users', UserSchema);
