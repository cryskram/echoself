import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    regId: String!
    generations: Int!
  }

  type Query {
    users: [User!]!
    userByRegId(regId: String!): User
  }

  type Mutation {
    consumeGeneration(regId: String!): User
  }
`;
