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

export const GET_MONTHLY_STATS_QUERY = graphql(`
  query GetMonthlyStats($month: Int!, $year: Int!) {
    monthlyStats(month: $month, year: $year) {
      month
      year
      billsCount
      totalAmount
    }
  }
`);

export const GET_MY_MONTHLY_STATS_QUERY = graphql(`
  query GetMyMonthlyStats($month: Int!, $year: Int!) {
    myMonthlyStats(month: $month, year: $year) {
      month
      year
      billsCount
      totalAmount
    }
  }
`);
