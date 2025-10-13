import { graphql } from "@/graphql";

export const CREATE_BILL_MUTATION = graphql(`
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
`);

export const UPDATE_BILL_MUTATION = graphql(`
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
`);

export const DELETE_BILL_MUTATION = graphql(`
  mutation DeleteBill($id: ID!) {
    deleteBill(id: $id)
  }
`);
