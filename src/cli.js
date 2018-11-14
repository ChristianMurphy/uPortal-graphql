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

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
