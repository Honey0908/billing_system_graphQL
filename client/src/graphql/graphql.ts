/* eslint-disable */
import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  firm: Firm;
  token: Scalars["String"]["output"];
  user: User;
};

export type Bill = {
  __typename?: "Bill";
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["String"]["output"];
  customerName?: Maybe<Scalars["String"]["output"]>;
  customerPhone?: Maybe<Scalars["String"]["output"]>;
  firm: Firm;
  id: Scalars["ID"]["output"];
  items: Array<BillItem>;
  title: Scalars["String"]["output"];
  totalAmount: Scalars["Float"]["output"];
  user: User;
};

export type BillItem = {
  __typename?: "BillItem";
  id: Scalars["ID"]["output"];
  price: Scalars["Float"]["output"];
  product: Product;
  quantity: Scalars["Int"]["output"];
  total: Scalars["Float"]["output"];
};

export type BillItemInput = {
  productId: Scalars["ID"]["input"];
  quantity: Scalars["Int"]["input"];
};

export type CreateBillInput = {
  customerName?: InputMaybe<Scalars["String"]["input"]>;
  customerPhone?: InputMaybe<Scalars["String"]["input"]>;
  items: Array<BillItemInput>;
  title: Scalars["String"]["input"];
};

export type Firm = {
  __typename?: "Firm";
  address?: Maybe<Scalars["String"]["output"]>;
  bills: Array<Bill>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  users: Array<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  _empty?: Maybe<Scalars["String"]["output"]>;
  createBill: Bill;
  createProduct: Product;
  createUser: User;
  deleteBill: Scalars["Boolean"]["output"];
  deleteProduct: Scalars["Boolean"]["output"];
  deleteUser: User;
  login: AuthResponse;
  signUpFirm: AuthResponse;
  updateBill: Bill;
  updateProduct: Product;
};

export type MutationCreateBillArgs = {
  input: CreateBillInput;
};

export type MutationCreateProductArgs = {
  input: ProductInput;
};

export type MutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  firmId: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  role: UserRole;
};

export type MutationDeleteBillArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteProductArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignUpFirmArgs = {
  adminEmail: Scalars["String"]["input"];
  adminName: Scalars["String"]["input"];
  adminPassword: Scalars["String"]["input"];
  firmAddress?: InputMaybe<Scalars["String"]["input"]>;
  firmEmail: Scalars["String"]["input"];
  firmName: Scalars["String"]["input"];
  firmPhone?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateBillArgs = {
  id: Scalars["ID"]["input"];
  input: CreateBillInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars["ID"]["input"];
  input: ProductInput;
};

export type Product = {
  __typename?: "Product";
  createdAt: Scalars["String"]["output"];
  firm: Firm;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
};

export type ProductInput = {
  name: Scalars["String"]["input"];
  price: Scalars["Float"]["input"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]["output"]>;
  bill?: Maybe<Bill>;
  bills: Array<Bill>;
  me?: Maybe<User>;
  myBills: Array<Bill>;
  product?: Maybe<Product>;
  products: Array<Product>;
  users: Array<User>;
};

export type QueryBillArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryProductArgs = {
  id: Scalars["ID"]["input"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  firm: Firm;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  password?: Maybe<Scalars["String"]["output"]>;
  role: UserRole;
};

export enum UserRole {
  Admin = "ADMIN",
  Staff = "STAFF",
}

export type CreateBillMutationVariables = Exact<{
  input: CreateBillInput;
}>;

export type CreateBillMutation = {
  __typename?: "Mutation";
  createBill: {
    __typename?: "Bill";
    id: string;
    title: string;
    createdAt: string;
    totalAmount: number;
    customerName?: string | null;
    customerPhone?: string | null;
    user: { __typename?: "User"; id: string; email: string; name: string };
    firm: { __typename?: "Firm"; id: string; name: string };
    items: Array<{
      __typename?: "BillItem";
      id: string;
      quantity: number;
      price: number;
      total: number;
      product: {
        __typename?: "Product";
        id: string;
        name: string;
        price: number;
      };
    }>;
  };
};

export type UpdateBillMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  input: CreateBillInput;
}>;

export type UpdateBillMutation = {
  __typename?: "Mutation";
  updateBill: {
    __typename?: "Bill";
    id: string;
    title: string;
    createdAt: string;
    totalAmount: number;
    customerName?: string | null;
    customerPhone?: string | null;
    user: { __typename?: "User"; id: string; email: string; name: string };
    firm: { __typename?: "Firm"; id: string; name: string };
    items: Array<{
      __typename?: "BillItem";
      id: string;
      quantity: number;
      price: number;
      total: number;
      product: {
        __typename?: "Product";
        id: string;
        name: string;
        price: number;
      };
    }>;
  };
};

export type DeleteBillMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteBillMutation = {
  __typename?: "Mutation";
  deleteBill: boolean;
};

export type SignUpFirmMutationVariables = Exact<{
  firmName: Scalars["String"]["input"];
  firmEmail: Scalars["String"]["input"];
  firmAddress?: InputMaybe<Scalars["String"]["input"]>;
  firmPhone?: InputMaybe<Scalars["String"]["input"]>;
  adminEmail: Scalars["String"]["input"];
  adminPassword: Scalars["String"]["input"];
  adminName: Scalars["String"]["input"];
}>;

export type SignUpFirmMutation = {
  __typename?: "Mutation";
  signUpFirm: {
    __typename?: "AuthResponse";
    token: string;
    user: {
      __typename?: "User";
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
    firm: {
      __typename?: "Firm";
      id: string;
      name: string;
      email: string;
      phone: string;
    };
  };
};

export type CreateProductMutationVariables = Exact<{
  input: ProductInput;
}>;

export type CreateProductMutation = {
  __typename?: "Mutation";
  createProduct: {
    __typename?: "Product";
    id: string;
    name: string;
    price: number;
    createdAt: string;
  };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  input: ProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: "Mutation";
  updateProduct: {
    __typename?: "Product";
    id: string;
    name: string;
    price: number;
    createdAt: string;
  };
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteProductMutation = {
  __typename?: "Mutation";
  deleteProduct: boolean;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "AuthResponse";
    token: string;
    user: {
      __typename?: "User";
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
    firm: {
      __typename?: "Firm";
      id: string;
      name: string;
      email: string;
      phone: string;
    };
  };
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  role: UserRole;
  firmId: Scalars["ID"]["input"];
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: { __typename?: "User"; id: string; name: string; email: string };
};

export type GetBillsQueryVariables = Exact<{ [key: string]: never }>;

export type GetBillsQuery = {
  __typename?: "Query";
  bills: Array<{
    __typename?: "Bill";
    id: string;
    title: string;
    createdAt: string;
    totalAmount: number;
    customerName?: string | null;
    customerPhone?: string | null;
    user: { __typename?: "User"; id: string; email: string; name: string };
    firm: { __typename?: "Firm"; id: string; name: string };
    items: Array<{
      __typename?: "BillItem";
      id: string;
      quantity: number;
      price: number;
      total: number;
      product: {
        __typename?: "Product";
        id: string;
        name: string;
        price: number;
      };
    }>;
  }>;
};

export type GetMyBillsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyBillsQuery = {
  __typename?: "Query";
  myBills: Array<{
    __typename?: "Bill";
    id: string;
    title: string;
    createdAt: string;
    totalAmount: number;
    customerName?: string | null;
    customerPhone?: string | null;
    user: { __typename?: "User"; id: string; email: string; name: string };
    firm: { __typename?: "Firm"; id: string; name: string };
    items: Array<{
      __typename?: "BillItem";
      id: string;
      quantity: number;
      price: number;
      total: number;
      product: {
        __typename?: "Product";
        id: string;
        name: string;
        price: number;
      };
    }>;
  }>;
};

export type GetBillQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetBillQuery = {
  __typename?: "Query";
  bill?: {
    __typename?: "Bill";
    id: string;
    title: string;
    createdAt: string;
    totalAmount: number;
    customerName?: string | null;
    customerPhone?: string | null;
    user: { __typename?: "User"; id: string; email: string; name: string };
    firm: { __typename?: "Firm"; id: string; name: string };
    items: Array<{
      __typename?: "BillItem";
      id: string;
      quantity: number;
      price: number;
      total: number;
      product: {
        __typename?: "Product";
        id: string;
        name: string;
        price: number;
      };
    }>;
  } | null;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductsQuery = {
  __typename?: "Query";
  products: Array<{
    __typename?: "Product";
    id: string;
    name: string;
    price: number;
    createdAt: string;
  }>;
};

export type GetProductQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetProductQuery = {
  __typename?: "Query";
  product?: {
    __typename?: "Product";
    id: string;
    name: string;
    price: number;
    createdAt: string;
    firm: { __typename?: "Firm"; id: string; name: string };
  } | null;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    role: UserRole;
    firm: {
      __typename?: "Firm";
      id: string;
      name: string;
      email: string;
      address?: string | null;
      phone: string;
    };
  } | null;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }>;
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<
    DocumentTypeDecoration<TResult, TVariables>["__apiType"]
  >;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateBillDocument = new TypedDocumentString(`
    mutation CreateBill($input: CreateBillInput!) {
  createBill(input: $input) {
    id
    title
    createdAt
    totalAmount
    customerName
    customerPhone
    user {
      id
      email
      name
    }
    firm {
      id
      name
    }
    items {
      id
      quantity
      price
      total
      product {
        id
        name
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
  CreateBillMutation,
  CreateBillMutationVariables
>;
export const UpdateBillDocument = new TypedDocumentString(`
    mutation UpdateBill($id: ID!, $input: CreateBillInput!) {
  updateBill(id: $id, input: $input) {
    id
    title
    createdAt
    totalAmount
    customerName
    customerPhone
    user {
      id
      email
      name
    }
    firm {
      id
      name
    }
    items {
      id
      quantity
      price
      total
      product {
        id
        name
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
  UpdateBillMutation,
  UpdateBillMutationVariables
>;
export const DeleteBillDocument = new TypedDocumentString(`
    mutation DeleteBill($id: ID!) {
  deleteBill(id: $id)
}
    `) as unknown as TypedDocumentString<
  DeleteBillMutation,
  DeleteBillMutationVariables
>;
export const SignUpFirmDocument = new TypedDocumentString(`
    mutation SignUpFirm($firmName: String!, $firmEmail: String!, $firmAddress: String, $firmPhone: String, $adminEmail: String!, $adminPassword: String!, $adminName: String!) {
  signUpFirm(
    firmName: $firmName
    firmEmail: $firmEmail
    firmAddress: $firmAddress
    firmPhone: $firmPhone
    adminEmail: $adminEmail
    adminPassword: $adminPassword
    adminName: $adminName
  ) {
    token
    user {
      id
      name
      email
      role
    }
    firm {
      id
      name
      email
      phone
    }
  }
}
    `) as unknown as TypedDocumentString<
  SignUpFirmMutation,
  SignUpFirmMutationVariables
>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    name
    price
    createdAt
  }
}
    `) as unknown as TypedDocumentString<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: ID!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    price
    createdAt
  }
}
    `) as unknown as TypedDocumentString<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const DeleteProductDocument = new TypedDocumentString(`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
    `) as unknown as TypedDocumentString<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const LoginDocument = new TypedDocumentString(`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
      role
    }
    firm {
      id
      name
      email
      phone
    }
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($name: String!, $email: String!, $password: String!, $role: UserRole!, $firmId: ID!) {
  createUser(
    name: $name
    email: $email
    password: $password
    role: $role
    firmId: $firmId
  ) {
    id
    name
    email
    role
  }
}
    `) as unknown as TypedDocumentString<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const DeleteUserDocument = new TypedDocumentString(`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
    email
  }
}
    `) as unknown as TypedDocumentString<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const GetBillsDocument = new TypedDocumentString(`
    query GetBills {
  bills {
    id
    title
    createdAt
    totalAmount
    customerName
    customerPhone
    user {
      id
      email
      name
    }
    firm {
      id
      name
    }
    items {
      id
      quantity
      price
      total
      product {
        id
        name
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetBillsQuery, GetBillsQueryVariables>;
export const GetMyBillsDocument = new TypedDocumentString(`
    query GetMyBills {
  myBills {
    id
    title
    createdAt
    totalAmount
    customerName
    customerPhone
    user {
      id
      email
      name
    }
    firm {
      id
      name
    }
    items {
      id
      quantity
      price
      total
      product {
        id
        name
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
  GetMyBillsQuery,
  GetMyBillsQueryVariables
>;
export const GetBillDocument = new TypedDocumentString(`
    query GetBill($id: ID!) {
  bill(id: $id) {
    id
    title
    createdAt
    totalAmount
    customerName
    customerPhone
    user {
      id
      email
      name
    }
    firm {
      id
      name
    }
    items {
      id
      quantity
      price
      total
      product {
        id
        name
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetBillQuery, GetBillQueryVariables>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts {
  products {
    id
    name
    price
    createdAt
  }
}
    `) as unknown as TypedDocumentString<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price
    createdAt
    firm {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<
  GetProductQuery,
  GetProductQueryVariables
>;
export const GetMeDocument = new TypedDocumentString(`
    query GetMe {
  me {
    id
    name
    email
    role
    firm {
      id
      name
      email
      address
      phone
    }
  }
}
    `) as unknown as TypedDocumentString<GetMeQuery, GetMeQueryVariables>;
export const GetUsersDocument = new TypedDocumentString(`
    query GetUsers {
  users {
    id
    name
    email
    role
  }
}
    `) as unknown as TypedDocumentString<GetUsersQuery, GetUsersQueryVariables>;
