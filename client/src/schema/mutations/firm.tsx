import { graphql } from "@/graphql";

export const SIGNUP_FIRM_MUTATION = graphql(`
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
`);
