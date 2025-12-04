import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import {
  authDirective,
  hasRoleDirective,
  rateLimitDirective,
  lengthDirective,
} from './directives/index.js';

// Create the base schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Apply directives in order
schema = authDirective('auth')(schema);
schema = hasRoleDirective('hasRole')(schema);
schema = rateLimitDirective('rateLimit')(schema);
schema = lengthDirective('length')(schema);

export { schema };
