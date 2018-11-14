const { gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};
