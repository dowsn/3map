import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  postAnchor: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  user : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

export default mongoose.model('posts', PostSchema);
