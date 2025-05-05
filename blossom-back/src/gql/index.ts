import { createHandler } from "graphql-http/lib/use/express";
import root from "./resolvers";
import schema from "./schemas";

const graphqlHandler = createHandler({
  schema: schema,
  rootValue: root,
});

export { schema, root };

export default graphqlHandler;
