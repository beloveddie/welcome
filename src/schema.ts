import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Mutation {
    signin(credentialInput: CredentialInput!): UserResponse!
    signup(name: String!, credentialInput: CredentialInput!): UserResponse!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  input CredentialInput {
    email: String!
    password: String!
  }

  type UserResponse {
    success: Boolean!
    message: String!
    token: String
  }
`;
