const { gql } = require("apollo-server");
const { RESTDataSource } = require("apollo-datasource-rest");

class uPortalAPI extends RESTDataSource {
  constructor() {
    super();
    // all APIs start at /uPortal/api
    this.baseURL = `${process.env.HOST ||
      "http://localhost:8080"}/uPortal/api/`;
  }

  // pass authorization header along to uPortal
  willSendRequest(request) {
    request.headers.set("Authorization", this.context.authorization);
  }

  async getLayout() {
    return this.get("v4-3/dlm/layout.json");
  }

  async getMe() {
    return this.get("v5-0/people/me");
  }
}

exports.uPortalAPI = uPortalAPI;

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  type Query {
    layout: Layout
    me: Me
  }

  type Layout {
    user: String
    authenicated: Boolean
    hostname: String
    fragmentAdmin: String
    locale: String
    layout: SubLayout
  }

  type SubLayout {
    regions: [LayoutRegion]
    globals: LayoutGlobals
  }

  type LayoutGlobals {
    userLayoutRoot: String
    hasFavorites: Boolean
    activeTabGroup: String
    tabsInTabGroup: Int
    userImpersonation: Boolean
  }

  type LayoutRegion {
    name: String
    content: [LayoutContent]
  }

  type LayoutContent {
    _objectType: String
    url: String
    iconUrl: String
    ID: String
    chanID: Int
    description: String
    fragment: Int
    precedence: Float
    fname: String
    timeout: Int
    title: String
    typeID: Int
    windowState: String
    portletMode: String
    portletName: String
    lifecycleState: LifeCycleState
    webAppName: String
    # TODO parameters
  }

  enum LifeCycleState {
    CREATED
    APPROVED
    PUBLISHED
    EXPIRED
    MAINTENANCE
  }

  type Me {
    uid: [String]
    telephoneNumber: [String]
    mail: [String]
    displayName: [String]
    givenName: [String]
    alternateEmailAddress: [String]
    # TODO figure out how to handler "user.login.id"
    sn: [String]
    title: [String]
    department: [String]
    username: [String]
  }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    layout: (_sources, _attrs, { dataSources }) =>
      dataSources.uPortalAPI.getLayout(),
    me: (_sources, _attrs, { dataSources }) => dataSources.uPortalAPI.getMe()
  }
};
