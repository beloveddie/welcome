import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Mutation {
    signin(signinInput: UserInput!): UserResponse!
    signup(signupInput: UserInput!): UserResponse!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UserInput {
    name: String
    email: String!
    password: String!
  }

  type UserResponse {
    success: Boolean!
    message: String!
    user: User
  }
`;
