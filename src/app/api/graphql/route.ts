import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

const typeDefs = gql`
  type Query {
    checkAuth: JSON
  }
  scalar JSON
`;

interface Context {
  req: NextRequest;
}

const resolvers = {
  Query: {
    checkAuth: (_: unknown, __: unknown, context: Context) => {
      const authHeader = context.req.headers
        .get("authorization")
        ?.replace("Bearer ", "");
      return authHeader
        ? {
            id: authHeader,
          }
        : null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => ({ req }),
});

export { handler as GET, handler as POST };
