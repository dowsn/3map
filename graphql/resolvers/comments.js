import { AuthenticationError, UserInputError } from 'apollo-server';
import Post from '../../models/Post.js';
import checkAuth from '../../utils/checkAuth.js';

const resolvers = {

  Mutation: {
    createComment: async (_, { postId, body }, context) => {

      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Comment body must not be empty', {
          errors: {
            body: 'Comment body must not be empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else {
        throw new Error('Post not found');
      }
    },

    async deleteComment(_, { postId, commentId }, context) {

        const user = checkAuth(context);

        const post = await Post.findById(postId);

        if (post) {

          const comment = post.comments.findIndex(c => c.id === commentId);

          if (
            comment !== false &&
            comment !== null &&
            post.comments[comment].username === user.username
          ) {
            post.comments.splice(comment, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError(
              'Comment not found or not authorized to delete',
            );
          }

        } else {
          throw new UserInputError('Post not found');
        }
      }

  },
};

export default resolvers;
