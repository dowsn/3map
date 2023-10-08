import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    user: ID!
    relatedPosts: [ID]
    username: String!
    sourcePost: ID
    countBranches: Int!
  }
  type Document {
    id: ID!
    date: Date!
    createdAt: String!
    user: ID!
    relatedPosts: [ID]
    username: String!
    sourcePost: ID
    countBranches: Int!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  # must be input type
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    # deletePost(postId: ID!): String!
  }
`;

export default typeDefs;