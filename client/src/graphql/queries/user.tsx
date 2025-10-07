import { graphql } from "../gql";

export const GET_ME_QUERY = graphql(`
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
`);
