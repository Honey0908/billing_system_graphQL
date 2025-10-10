import { graphql } from "@/graphql";

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

export const GET_USERS_QUERY = graphql(`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`);
