const { gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");

class LayoutAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/uPortal/api";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.authorization);
  }

  async getLayout() {
    return this.get("/v4-3/dlm/layout.json");
  }
}

exports.LayoutAPI = LayoutAPI;

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  type Query {
    layout: Layout
  }

  type Layout {
    user: String
    authenicated: Boolean
    regions: [Region]
  }

  type Region {
    name: String
    content: [Content]
  }

  type Content {
    url: String
  }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    layout: (_sources, _attrs, { dataSources }) =>
      dataSources.LayoutAPI.getLayout()
  }
};
