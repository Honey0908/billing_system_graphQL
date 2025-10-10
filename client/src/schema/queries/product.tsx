import { graphql } from "@/graphql";

export const GET_PRODUCTS_QUERY = graphql(`
  query GetProducts {
    products {
      id
      name
      price
      createdAt
    }
  }
`);

export const GET_PRODUCT_QUERY = graphql(`
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
`);
