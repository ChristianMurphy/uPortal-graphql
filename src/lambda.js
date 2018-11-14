const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers, LayoutAPI } = require("./index.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    LayoutAPI: new LayoutAPI()
  }),
  context: ({ req }) => ({
    authorization: req.headers.authorization
  })
});

exports.handler = server.createHandler();
