import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { Query, Mutation } from "./resolvers";
import { context } from "./context";

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
  context: context,
});

server.listen().then(async ({ url }) => {
  console.log(`
        🚀 Server running on ${url}
    `);
});
