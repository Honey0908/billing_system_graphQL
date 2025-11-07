import { gql } from "@apollo/client/core";
import type { TypedDocumentNode } from "@apollo/client";
import type {
  LoginMutation,
  LoginMutationVariables,
  SignUpFirmMutation,
  SignUpFirmMutationVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  CreateProductMutation,
  CreateProductMutationVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  DeleteProductMutation,
  DeleteProductMutationVariables,
  CreateBillMutation,
  CreateBillMutationVariables,
  UpdateBillMutation,
  UpdateBillMutationVariables,
  DeleteBillMutation,
  DeleteBillMutationVariables,
} from "./graphql";

/**
 * Authentication Mutations
 */

export const LOGIN: TypedDocumentNode<LoginMutation, LoginMutationVariables> =
  gql`
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
  `;

export const SIGNUP_FIRM: TypedDocumentNode<
  SignUpFirmMutation,
  SignUpFirmMutationVariables
> = gql`
  mutation SignUpFirm(
    $firmName: String!
    $firmEmail: String!
    $firmAddress: String
    $firmPhone: String
    $adminEmail: String!
    $adminPassword: String!
    $adminName: String!
  ) {
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
`;

/**
 * User Mutations
 */

export const CREATE_USER: TypedDocumentNode<
  CreateUserMutation,
  CreateUserMutationVariables
> = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $role: UserRole!
    $firmId: ID!
  ) {
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
`;

export const DELETE_USER: TypedDocumentNode<
  DeleteUserMutation,
  DeleteUserMutationVariables
> = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

/**
 * Product Mutations
 */

export const CREATE_PRODUCT: TypedDocumentNode<
  CreateProductMutation,
  CreateProductMutationVariables
> = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT: TypedDocumentNode<
  UpdateProductMutation,
  UpdateProductMutationVariables
> = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      createdAt
    }
  }
`;

export const DELETE_PRODUCT: TypedDocumentNode<
  DeleteProductMutation,
  DeleteProductMutationVariables
> = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

/**
 * Bill Mutations
 */

export const CREATE_BILL: TypedDocumentNode<
  CreateBillMutation,
  CreateBillMutationVariables
> = gql`
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
        productName
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const UPDATE_BILL: TypedDocumentNode<
  UpdateBillMutation,
  UpdateBillMutationVariables
> = gql`
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
        productName
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const DELETE_BILL: TypedDocumentNode<
  DeleteBillMutation,
  DeleteBillMutationVariables
> = gql`
  mutation DeleteBill($id: ID!) {
    deleteBill(id: $id)
  }
`;
