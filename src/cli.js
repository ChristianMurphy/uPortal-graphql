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

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
