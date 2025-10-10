import { graphql } from "@/graphql";

export const CREATE_PRODUCT_MUTATION = graphql(`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      createdAt
    }
  }
`);

export const UPDATE_PRODUCT_MUTATION = graphql(`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      createdAt
    }
  }
`);

export const DELETE_PRODUCT_MUTATION = graphql(`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`);
