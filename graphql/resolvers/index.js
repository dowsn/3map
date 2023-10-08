import commentsResolvers from './comments.js';
import postsResolvers from './posts.js';
import usersResolvers from './users.js';

const resolvers = {
  Query: {
    ...postsResolvers.Query,
    // ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }



};



export default resolvers;