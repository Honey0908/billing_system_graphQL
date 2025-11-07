# Quick Reference - GraphQL Operations

## Import Everything You Need

```typescript
// Single import for everything!
import { useQuery, useMutation } from "@apollo/client/react";

import {
  // Queries
  GET_ME,
  GET_USERS,
  GET_PRODUCTS,
  GET_BILLS,

  // Mutations
  LOGIN,
  CREATE_USER,
  DELETE_USER,
  CREATE_PRODUCT,

  // Types
  type GetProductsQuery,
  type CreateUserMutationVariables,
  UserRole,
} from "@/graphql";
```

## All Available Queries

| Query Name             | Description                | Variables                         |
| ---------------------- | -------------------------- | --------------------------------- |
| `GET_ME`               | Current authenticated user | None                              |
| `GET_USERS`            | All users in firm          | None                              |
| `GET_PRODUCTS`         | All products               | None                              |
| `GET_PRODUCT`          | Single product by ID       | `{ id: string }`                  |
| `GET_BILLS`            | All bills (admin)          | None                              |
| `GET_MY_BILLS`         | Current user's bills       | None                              |
| `GET_BILL`             | Single bill by ID          | `{ id: string }`                  |
| `GET_MONTHLY_STATS`    | Monthly statistics (admin) | `{ month: number, year: number }` |
| `GET_MY_MONTHLY_STATS` | User's monthly statistics  | `{ month: number, year: number }` |

## All Available Mutations

| Mutation Name    | Description       | Variables                                 |
| ---------------- | ----------------- | ----------------------------------------- |
| `LOGIN`          | User login        | `{ email: string, password: string }`     |
| `SIGNUP_FIRM`    | Register new firm | See SignUpFirmMutationVariables           |
| `CREATE_USER`    | Create new user   | `{ name, email, password, role, firmId }` |
| `DELETE_USER`    | Delete user       | `{ id: string }`                          |
| `CREATE_PRODUCT` | Create product    | `{ input: { name, price } }`              |
| `UPDATE_PRODUCT` | Update product    | `{ id: string, input: { name, price } }`  |
| `DELETE_PRODUCT` | Delete product    | `{ id: string }`                          |
| `CREATE_BILL`    | Create bill       | `{ input: CreateBillInput }`              |
| `UPDATE_BILL`    | Update bill       | `{ id: string, input: CreateBillInput }`  |
| `DELETE_BILL`    | Delete bill       | `{ id: string }`                          |

## Common Patterns

### Pattern 1: List All Items

```typescript
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/graphql";

const { data, loading, error } = useQuery(GET_PRODUCTS);
```

### Pattern 2: Get Single Item

```typescript
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT } from "@/graphql";

const { data } = useQuery(GET_PRODUCT, {
  variables: { id: productId },
});
```

### Pattern 3: Create Item

```typescript
import { useMutation } from "@apollo/client/react";
import { CREATE_PRODUCT } from "@/graphql";

const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
  refetchQueries: ["GetProducts"],
});

await createProduct({
  variables: {
    input: { name: "New Product", price: 99.99 },
  },
});
```

### Pattern 4: Delete Item

```typescript
import { useMutation } from "@apollo/client/react";
import { DELETE_PRODUCT } from "@/graphql";

const [deleteProduct] = useMutation(DELETE_PRODUCT, {
  refetchQueries: ["GetProducts"],
});

await deleteProduct({
  variables: { id: productId },
});
```

### Pattern 5: Update Item

```typescript
import { useMutation } from "@apollo/client/react";
import { UPDATE_PRODUCT } from "@/graphql";

const [updateProduct] = useMutation(UPDATE_PRODUCT);

await updateProduct({
  variables: {
    id: productId,
    input: { name: "Updated Name", price: 149.99 },
  },
  refetchQueries: ["GetProducts"],
});
```

### Pattern 6: Login

```typescript
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "@/graphql";

const [login, { loading, error }] = useMutation(LOGIN, {
  onCompleted: (data) => {
    localStorage.setItem("token", data.login.token);
    // Redirect user
  },
});

await login({
  variables: {
    email: "user@example.com",
    password: "password123",
  },
});
```

## Refetch Queries

After mutations, use `refetchQueries` to update the cache:

```typescript
const [createUser] = useMutation(CREATE_USER, {
  refetchQueries: [
    "GetUsers", // Refetch users list
    "GetMonthlyStats", // Refetch statistics
  ],
});
```

## Common Query Names for Refetching

- `"GetMe"` - Current user
- `"GetUsers"` - Users list
- `"GetProducts"` - Products list
- `"GetBills"` - All bills
- `"GetMyBills"` - User's bills
- `"GetMonthlyStats"` - Admin statistics
- `"GetMyMonthlyStats"` - User statistics

## Loading States

```typescript
const { loading } = useQuery(GET_PRODUCTS);

if (loading) {
  return <LoadingSpinner />;
}
```

## Error Handling

```typescript
const { error } = useQuery(GET_PRODUCTS);

if (error) {
  return <div>Error: {error.message}</div>;
}
```

## TypeScript Usage

All operations are fully typed. Types are automatically inferred:

```typescript
const { data } = useQuery(GET_PRODUCTS);

// data is typed as GetProductsQuery
// data.products is typed as Product[]
// Each product has id, name, price, createdAt
```

For explicit typing:

```typescript
import type { GetProductsQuery } from "@/graphql";

const { data } = useQuery<GetProductsQuery>(GET_PRODUCTS);
```

## Pro Tips

1. **Always use refetchQueries** after mutations to keep UI in sync
2. **Handle loading and error states** for better UX
3. **Use TypeScript** - let the compiler catch errors
4. **Import from @/graphql** - one central location
5. **Check GRAPHQL_SETUP.md** for detailed documentation
