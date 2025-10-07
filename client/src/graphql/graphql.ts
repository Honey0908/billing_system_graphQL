/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  firm: Firm;
  token: Scalars['String']['output'];
  user: User;
};

export type Bill = {
  __typename?: 'Bill';
  createdAt: Scalars['String']['output'];
  customerName?: Maybe<Scalars['String']['output']>;
  customerPhone?: Maybe<Scalars['String']['output']>;
  firm: Firm;
  id: Scalars['ID']['output'];
  items: Array<BillItem>;
  title: Scalars['String']['output'];
  totalAmount: Scalars['Float']['output'];
  user: User;
};

export type BillItem = {
  __typename?: 'BillItem';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export type BillItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateBillInput = {
  customerName?: InputMaybe<Scalars['String']['input']>;
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  items: Array<BillItemInput>;
  title: Scalars['String']['input'];
};

export type Firm = {
  __typename?: 'Firm';
  address?: Maybe<Scalars['String']['output']>;
  bills: Array<Bill>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  users: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createBill: Bill;
  createProduct: Product;
  createUser: User;
  deleteBill: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
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
  email: Scalars['String']['input'];
  firmId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};


export type MutationDeleteBillArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpFirmArgs = {
  adminEmail: Scalars['String']['input'];
  adminName: Scalars['String']['input'];
  adminPassword: Scalars['String']['input'];
  firmAddress?: InputMaybe<Scalars['String']['input']>;
  firmEmail: Scalars['String']['input'];
  firmName: Scalars['String']['input'];
  firmPhone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBillArgs = {
  id: Scalars['ID']['input'];
  input: CreateBillInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: ProductInput;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String']['output'];
  firm: Firm;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ProductInput = {
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  bill?: Maybe<Bill>;
  bills: Array<Bill>;
  me?: Maybe<User>;
  myBills: Array<Bill>;
  product?: Maybe<Product>;
  products: Array<Product>;
  users: Array<User>;
};


export type QueryBillArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firm: Firm;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  Staff = 'STAFF'
}

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
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
