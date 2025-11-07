import { gql } from "@apollo/client/core";
import type { TypedDocumentNode } from "@apollo/client";
import type {
  GetMeQuery,
  GetUsersQuery,
  GetProductsQuery,
  GetProductQuery,
  GetProductQueryVariables,
  GetBillsQuery,
  GetMyBillsQuery,
  GetBillQuery,
  GetBillQueryVariables,
  GetMonthlyStatsQuery,
  GetMonthlyStatsQueryVariables,
  GetMyMonthlyStatsQuery,
  GetMyMonthlyStatsQueryVariables,
} from "./graphql";

/**
 * User Queries
 */

export const GET_ME: TypedDocumentNode<GetMeQuery> = gql`
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
`;

export const GET_USERS: TypedDocumentNode<GetUsersQuery> = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

/**
 * Product Queries
 */

export const GET_PRODUCTS: TypedDocumentNode<GetProductsQuery> = gql`
  query GetProducts {
    products {
      id
      name
      price
      createdAt
    }
  }
`;

export const GET_PRODUCT: TypedDocumentNode<
  GetProductQuery,
  GetProductQueryVariables
> = gql`
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
`;

/**
 * Bill Queries
 */

export const GET_BILLS: TypedDocumentNode<GetBillsQuery> = gql`
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

export const GET_MY_BILLS: TypedDocumentNode<GetMyBillsQuery> = gql`
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

export const GET_BILL: TypedDocumentNode<GetBillQuery, GetBillQueryVariables> =
  gql`
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

/**
 * Statistics Queries
 */

export const GET_MONTHLY_STATS: TypedDocumentNode<
  GetMonthlyStatsQuery,
  GetMonthlyStatsQueryVariables
> = gql`
  query GetMonthlyStats($month: Int!, $year: Int!) {
    monthlyStats(month: $month, year: $year) {
      month
      year
      billsCount
      totalAmount
    }
  }
`;

export const GET_MY_MONTHLY_STATS: TypedDocumentNode<
  GetMyMonthlyStatsQuery,
  GetMyMonthlyStatsQueryVariables
> = gql`
  query GetMyMonthlyStats($month: Int!, $year: Int!) {
    myMonthlyStats(month: $month, year: $year) {
      month
      year
      billsCount
      totalAmount
    }
  }
`;
