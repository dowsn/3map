import { AuthenticationError } from 'apollo-server';
import Post from '../../models/Post.js';
import checkAuth from '../../utils/checkAuth.js';

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  Mutation: {
    async createPost(_, { body }, context) {

      // check user authentication
      const user = checkAuth(context);



      // body must not be empty
      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      // body must not be longer than 3 words
        let bodyArray = body.split(' ');
        if(bodyArray.length > 3) {
          throw new Error('Post body must not be longer than 3 words');
        }
      // each word must not be longer than 20 characters
        bodyArray.map((word) => {
          if (word.length > 20) throw new Error('Words must not be longer than 20 characters');
          // word must contain only letters
          if (word.match(/[^a-zA-Z]/)) throw new Error('Words must only contain letters');
        });

      // create new post
       const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString().split('T')[0],
      });

      const post = await newPost.save();

      return post;
      }


  },









    async deletePost(_, { postId }, context) {

    const user = checkAuth(context);

    try {

          const post = await Post.findById(postId);

      console.log(post);
          if (user && user.username === post.username) {
            await Post.deleteOne(post);
            return 'Post deleted successfully';
          } else {
            throw new AuthenticationError('Action not allowed');
          }
    } catch (error) {
      throw new Error(error);
    }
  },

};

export default resolvers;