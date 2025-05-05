import { createHandler } from "graphql-http/lib/use/express";
import root from "./resolvers";
import schema from "./schemas";

// Create GraphQL HTTP handler using the provided schema and resolvers
const graphqlHandler = createHandler({
  schema: schema,
  rootValue: root,
});

export { schema, root };

export default graphqlHandler;
