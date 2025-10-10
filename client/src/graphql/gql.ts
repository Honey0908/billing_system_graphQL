/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation CreateProduct($input: ProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n": typeof types.CreateProductDocument;
  "\n  mutation SignUpFirm(\n    $firmName: String!\n    $firmEmail: String!\n    $firmAddress: String\n    $firmPhone: String\n    $adminEmail: String!\n    $adminPassword: String!\n    $adminName: String!\n  ) {\n    signUpFirm(\n      firmName: $firmName\n      firmEmail: $firmEmail\n      firmAddress: $firmAddress\n      firmPhone: $firmPhone\n      adminEmail: $adminEmail\n      adminPassword: $adminPassword\n      adminName: $adminName\n    ) {\n      token\n      user {\n        id\n        name\n        email\n        role\n      }\n      firm {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n": typeof types.SignUpFirmDocument;
  "\n  mutation UpdateProduct($id: ID!, $input: ProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n": typeof types.UpdateProductDocument;
  "\n  mutation DeleteProduct($id: ID!) {\n    deleteProduct(id: $id)\n  }\n": typeof types.DeleteProductDocument;
  "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n        role\n      }\n      firm {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n": typeof types.LoginDocument;
  "\n  mutation CreateUser(\n    $name: String!\n    $email: String!\n    $password: String!\n    $role: UserRole!\n    $firmId: ID!\n  ) {\n    createUser(\n      name: $name\n      email: $email\n      password: $password\n      role: $role\n      firmId: $firmId\n    ) {\n      id\n      name\n      email\n      role\n    }\n  }\n": typeof types.CreateUserDocument;
  "\n  query GetProducts {\n    products {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n": typeof types.GetProductsDocument;
  "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      price\n      createdAt\n      firm {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetProductDocument;
  "\n  query GetMe {\n    me {\n      id\n      name\n      email\n      role\n      firm {\n        id\n        name\n        email\n        address\n        phone\n      }\n    }\n  }\n": typeof types.GetMeDocument;
};
const documents: Documents = {
  "\n  mutation CreateProduct($input: ProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n":
    types.CreateProductDocument,
  "\n  mutation SignUpFirm(\n    $firmName: String!\n    $firmEmail: String!\n    $firmAddress: String\n    $firmPhone: String\n    $adminEmail: String!\n    $adminPassword: String!\n    $adminName: String!\n  ) {\n    signUpFirm(\n      firmName: $firmName\n      firmEmail: $firmEmail\n      firmAddress: $firmAddress\n      firmPhone: $firmPhone\n      adminEmail: $adminEmail\n      adminPassword: $adminPassword\n      adminName: $adminName\n    ) {\n      token\n      user {\n        id\n        name\n        email\n        role\n      }\n      firm {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n":
    types.SignUpFirmDocument,
  "\n  mutation UpdateProduct($id: ID!, $input: ProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n":
    types.UpdateProductDocument,
  "\n  mutation DeleteProduct($id: ID!) {\n    deleteProduct(id: $id)\n  }\n":
    types.DeleteProductDocument,
  "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n        role\n      }\n      firm {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation CreateUser(\n    $name: String!\n    $email: String!\n    $password: String!\n    $role: UserRole!\n    $firmId: ID!\n  ) {\n    createUser(\n      name: $name\n      email: $email\n      password: $password\n      role: $role\n      firmId: $firmId\n    ) {\n      id\n      name\n      email\n      role\n    }\n  }\n":
    types.CreateUserDocument,
  "\n  query GetProducts {\n    products {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n":
    types.GetProductsDocument,
  "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      price\n      createdAt\n      firm {\n        id\n        name\n      }\n    }\n  }\n":
    types.GetProductDocument,
  "\n  query GetMe {\n    me {\n      id\n      name\n      email\n      role\n      firm {\n        id\n        name\n        email\n        address\n        phone\n      }\n    }\n  }\n":
    types.GetMeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateProduct($input: ProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n"
): typeof import("./graphql").CreateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SignUpFirm(\n    $firmName: String!\n    $firmEmail: String!\n    $firmAddress: String\n    $firmPhone: String\n    $adminEmail: String!\n    $adminPassword: String!\n    $adminName: String!\n  ) {\n    signUpFirm(\n      firmName: $firmName\n      firmEmail: $firmEmail\n      firmAddress: $firmAddress\n      firmPhone: $firmPhone\n      adminEmail: $adminEmail\n      adminPassword: $adminPassword\n      adminName: $adminName\n    ) {\n      token\n      user {\n        id\n        name\n        email\n        role\n      }\n      firm {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n"
): typeof import("./graphql").SignUpFirmDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateProduct($id: ID!, $input: ProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n"
): typeof import("./graphql").UpdateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteProduct($id: ID!) {\n    deleteProduct(id: $id)\n  }\n"
): typeof import("./graphql").DeleteProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n        role\n      }\n      firm {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n"
): typeof import("./graphql").LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateUser(\n    $name: String!\n    $email: String!\n    $password: String!\n    $role: UserRole!\n    $firmId: ID!\n  ) {\n    createUser(\n      name: $name\n      email: $email\n      password: $password\n      role: $role\n      firmId: $firmId\n    ) {\n      id\n      name\n      email\n      role\n    }\n  }\n"
): typeof import("./graphql").CreateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetProducts {\n    products {\n      id\n      name\n      price\n      createdAt\n    }\n  }\n"
): typeof import("./graphql").GetProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      price\n      createdAt\n      firm {\n        id\n        name\n      }\n    }\n  }\n"
): typeof import("./graphql").GetProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetMe {\n    me {\n      id\n      name\n      email\n      role\n      firm {\n        id\n        name\n        email\n        address\n        phone\n      }\n    }\n  }\n"
): typeof import("./graphql").GetMeDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
