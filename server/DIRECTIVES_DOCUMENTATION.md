# GraphQL Directives Implementation

This document describes the GraphQL directives implemented in the billing system to enhance security, validation, and code quality.

## Implemented Directives

### 1. @auth

**Purpose**: Ensures that only authenticated users can access certain fields or mutations.

**Usage**:

```graphql
type Query {
  me: User @auth
  myBills: [Bill!]! @auth
}
```

**How it works**:

- Checks if `context.user` exists
- Throws `UNAUTHENTICATED` error (401) if not logged in
- Automatically applied at the field level

**Before**: Manual checks in every resolver

```typescript
if (!context.user) throw new Error('Not authenticated');
```

**After**: Declarative in schema, handled by directive

### 2. @hasRole

**Purpose**: Restricts access based on user roles (ADMIN, STAFF).

**Usage**:

```graphql
type Query {
  users: [User!]! @auth @hasRole(roles: ["ADMIN"])
  bills: [Bill!]! @auth @hasRole(roles: ["ADMIN"])
}

type Mutation {
  createUser(...): User! @auth @hasRole(roles: ["ADMIN"])
  deleteProduct(id: ID!): Boolean! @auth @hasRole(roles: ["ADMIN"])
}
```

**How it works**:

- Requires `@auth` directive (checks authentication first)
- Fetches user role from database
- Compares against allowed roles array
- Throws `FORBIDDEN` error (403) if role not in list

**Before**: Manual role checks in resolvers

```typescript
const requestingUser = await prisma.user.findUnique({
  where: { id: context.user.userId },
});
if (!requestingUser || requestingUser.role !== 'ADMIN') {
  throw new Error('Only ADMIN can perform this action');
}
```

**After**: Declarative role-based access control

### 3. @rateLimit

**Purpose**: Prevents abuse by limiting the number of requests within a time window.

**Usage**:

```graphql
type Mutation {
  login(email: String!, password: String!): AuthResponse!
    @rateLimit(limit: 5, duration: 60)

  signUpFirm(...): AuthResponse!
    @rateLimit(limit: 3, duration: 300)
}
```

**Parameters**:

- `limit`: Maximum number of requests (default: 10)
- `duration`: Time window in seconds (default: 60)

**How it works**:

- Uses in-memory store (keyed by userId or "anonymous")
- Tracks request count per field per user
- Resets after duration expires
- Throws `RATE_LIMIT_EXCEEDED` error (429) when limit exceeded

**Note**: For production, consider using Redis for distributed rate limiting.

### 4. @length

**Purpose**: Validates string length for inputs.

**Usage**:

```graphql
type Mutation {
  createUser(
    name: String! @length(min: 2, max: 100)
    email: String! @length(min: 5, max: 255)
    password: String! @length(min: 6, max: 100)
  ): User!

  createBill(title: String! @length(min: 1, max: 200)): Bill!
}

input ProductInput {
  name: String! @length(min: 1, max: 200)
  price: Float!
}
```

**Parameters**:

- `min`: Minimum length (optional)
- `max`: Maximum length (optional)

**How it works**:

- Validates string arguments before resolver execution
- Throws `BAD_USER_INPUT` error if validation fails
- Provides clear error messages with constraint details

### 5. @deprecated

**Purpose**: Marks fields as deprecated with optional reason.

**Usage**:

```graphql
type User {
  oldField: String @deprecated(reason: "Use newField instead")
  newField: String
}
```

**How it works**:

- Built-in GraphQL directive
- Shows deprecation warnings in GraphQL IDE
- Helps with API evolution

## Applied Directives in Schema

### User Operations

```graphql
extend type Query {
  me: User @auth
  users: [User!]! @auth @hasRole(roles: ["ADMIN"])
}

extend type Mutation {
  createUser(
    name: String! @length(min: 2, max: 100)
    email: String! @length(min: 5, max: 255)
    password: String! @length(min: 6, max: 100)
    role: UserRole!
    firmId: ID!
  ): User! @auth @hasRole(roles: ["ADMIN"])

  deleteUser(id: ID!): User! @auth @hasRole(roles: ["ADMIN"])

  login(import { GraphQLError } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { Context } from '../../context.js';

export function authDirective(directiveName: string = 'auth') {
  return (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (directive) {
          const { resolve = defaultFieldResolver } = fieldConfig;

          fieldConfig.resolve = async function (source, args, context: Context, info) {
            if (!context.user) {
              throw new GraphQLError('Not authenticated', {
                extensions: {
                  code: 'UNAUTHENTICATED',
                  http: { status: 401 },
                },
              });
            }
            return resolve(source, args, context, info);
          };
        }
        return fieldConfig;
      },
    });
  };
}

function defaultFieldResolver(source: any, args: any, context: any, info: any) {
  if (typeof source === 'object' && source !== null && info.fieldName in source) {
    return source[info.fieldName];
  }
}

    email: String! @length(min: 5, max: 255)
    password: String! @length(min: 6, max: 100)
  ): AuthResponse! @rateLimit(limit: 5, duration: 60)
}
```

### Product Operations

```graphql
extend type Query {
  products: [Product!]! @auth
  product(id: ID!): Product @auth
}

extend type Mutation {
  createProduct(input: ProductInput!): Product! @auth @hasRole(roles: ["ADMIN"])
  updateProduct(id: ID!, input: ProductInput!): Product!
    @auth
    @hasRole(roles: ["ADMIN"])
  deleteProduct(id: ID!): Boolean! @auth @hasRole(roles: ["ADMIN"])
}
```

### Bill Operations

```graphql
extend type Query {
  bills: [Bill!]! @auth @hasRole(roles: ["ADMIN"])
  bill(id: ID!): Bill @auth @hasRole(roles: ["ADMIN"])
  myBills: [Bill!]! @auth
  monthlyStats(month: Int!, year: Int!): MonthlyStats!
    @auth
    @hasRole(roles: ["ADMIN"])
  myMonthlyStats(month: Int!, year: Int!): MonthlyStats! @auth
}

extend type Mutation {
  createBill(input: CreateBillInput!): Bill! @auth
  updateBill(id: ID!, input: CreateBillInput!): Bill! @auth
  deleteBill(id: ID!): Boolean! @auth @hasRole(roles: ["ADMIN"])
}
```

### Firm Operations

```graphql
extend type Mutation {
  signUpFirm(
    firmName: String! @length(min: 2, max: 200)
    firmEmail: String! @length(min: 5, max: 255)
    firmAddress: String
    firmPhone: String
    adminEmail: String! @length(min: 5, max: 255)
    adminPassword: String! @length(min: 6, max: 100)
    adminName: String! @length(min: 2, max: 100)
  ): AuthResponse! @rateLimit(limit: 3, duration: 300)
}
```

## Benefits

### 1. **Cleaner Code**

- Resolvers focus on business logic
- No repetitive authentication/authorization checks
- Easier to read and maintain

### 2. **Declarative Security**

- Security rules visible in schema
- Easier to audit permissions
- Consistent error handling

### 3. **Better Developer Experience**

- GraphQL IDE shows directive information
- Self-documenting API
- Type-safe validation

### 4. **Flexibility**

- Easy to add/remove directives
- Can combine multiple directives
- Reusable across fields

### 5. **Performance**

- Context already fetches user role
- Directives execute before resolvers
- Early exit on validation failures

## Implementation Details

### Directory Structure

```
server/src/graphql/
├── directives/
│   ├── authDirective.ts
│   ├── hasRoleDirective.ts
│   ├── rateLimitDirective.ts
│   ├── lengthDirective.ts
│   └── index.ts
├── schema.ts (applies directives)
├── typeDefs.ts
└── resolvers/
```

### Schema Builder (schema.ts)

```typescript
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import {
  authDirective,
  hasRoleDirective,
  rateLimitDirective,
  lengthDirective,
} from './directives/index.js';

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
```

### Context Enhancement

The context now includes user role for better performance:

```typescript
export interface Context {
  user: { userId: string; firmId: string; role?: string } | null;
}
```

## Error Handling

All directives throw standardized GraphQL errors:

### Authentication Error (401)

```json
{
  "errors": [
    {
      "message": "Not authenticated",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "http": { "status": 401 }
      }
    }
  ]
}
```

### Authorization Error (403)

```json
{
  "errors": [
    {
      "message": "You must have one of the following roles: ADMIN",
      "extensions": {
        "code": "FORBIDDEN",
        "http": { "status": 403 },
        "requiredRoles": ["ADMIN"]
      }
    }
  ]
}
```

### Rate Limit Error (429)

```json
{
  "errors": [
    {
      "message": "Rate limit exceeded. Try again in 45 seconds.",
      "extensions": {
        "code": "RATE_LIMIT_EXCEEDED",
        "http": { "status": 429 },
        "resetIn": 45
      }
    }
  ]
}
```

### Validation Error (400)

```json
{
  "errors": [
    {
      "message": "Argument 'password' must be at least 6 characters long",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "argumentName": "password",
        "constraint": "min",
        "value": 6
      }
    }
  ]
}
```

## Future Enhancements

### 1. @cacheControl

```graphql
type Product {
  id: ID!
  name: String! @cacheControl(maxAge: 3600)
}
```

### 2. @validate

```graphql
type Mutation {
  createUser(
    email: String! @validate(pattern: "email")
    phone: String @validate(pattern: "phone")
  ): User!
}
```

### 3. @cost

```graphql
type Query {
  expensiveQuery: [Result!]! @cost(complexity: 10)
}
```

### 4. @requires

```graphql
type Product {
  price: Float!
  discountedPrice: Float! @requires(fields: "price discount")
}
```

## Testing

Test directives using GraphQL Playground or Apollo Studio:

1. **Test @auth**: Query without authorization header
2. **Test @hasRole**: Login as STAFF, try ADMIN-only operations
3. **Test @rateLimit**: Send multiple login requests rapidly
4. **Test @length**: Send strings shorter/longer than limits

Example queries available in `tests/` directory.

## Migration Notes

When migrating from manual checks to directives:

1. ✅ Add directive definitions to `base.graphql`
2. ✅ Create directive implementations in `directives/`
3. ✅ Update `schema.ts` to apply directives
4. ✅ Add directives to schema files
5. ⚠️ Remove manual checks from resolvers (optional but recommended)
6. ⚠️ Update context to include role information
7. ⚠️ Test all operations thoroughly

**Note**: You can keep both directive-based and manual checks during migration for safety.

## Resources

- [GraphQL Directives Documentation](https://www.graphql-tools.com/docs/schema-directives)
- [@graphql-tools/schema](https://www.graphql-tools.com/docs/generate-schema)
- [@graphql-tools/utils](https://www.graphql-tools.com/docs/schema-directives)
- [Apollo Server v4 Documentation](https://www.apollographql.com/docs/apollo-server/)
