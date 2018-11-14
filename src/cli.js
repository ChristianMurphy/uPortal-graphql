const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./index.js");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
