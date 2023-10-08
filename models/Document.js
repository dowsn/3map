import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const DocumnetSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  username: String,
  createdAt: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default mongoose.model('posts', PostSchema);
