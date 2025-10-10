import { graphql } from "@/graphql";

export const LOGIN_MUTATION = graphql(`
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
`);

export const CREATE_USER_MUTATION = graphql(`
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
`);

export const DELETE_USER_MUTATION = graphql(`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`);
