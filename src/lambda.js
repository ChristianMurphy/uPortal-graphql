const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers, uPortalAPI } = require("./index.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    uPortalAPI: new uPortalAPI()
  }),
  context: ({ req }) => ({
    authorization: req.headers.authorization
  })
});

exports.graphqlHandler = server.createHandler();
