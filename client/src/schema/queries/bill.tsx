import { graphql } from "@/graphql";

export const GET_BILLS_QUERY = graphql(`
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
`);

export const GET_MY_BILLS_QUERY = graphql(`
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
`);

export const GET_BILL_QUERY = graphql(`
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
`);
