import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createContext } from './src/context.js';
import { schema } from './src/graphql/schema.js';

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => createContext({ req }),
});

console.log(`🚀  Server ready at: ${url}`);
