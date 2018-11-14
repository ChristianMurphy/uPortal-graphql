const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./index.js");

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = server.createHandler();
