/**
 * GraphQL Operations Index
 *
 * This file re-exports all GraphQL queries and mutations for easy importing.
 * All operations are fully typed using generated types from GraphQL Code Generator.
 */

// Export all queries
export {
  GET_ME,
  GET_USERS,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_BILLS,
  GET_MY_BILLS,
  GET_BILL,
  GET_MONTHLY_STATS,
  GET_MY_MONTHLY_STATS,
} from "./queries";

// Export all mutations
export {
  LOGIN,
  SIGNUP_FIRM,
  CREATE_USER,
  DELETE_USER,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_BILL,
  UPDATE_BILL,
  DELETE_BILL,
} from "./mutations";

// Re-export commonly used types
export type {
  // Auth types
  LoginMutation,
  LoginMutationVariables,
  SignUpFirmMutation,
  SignUpFirmMutationVariables,

  // User types
  GetMeQuery,
  GetUsersQuery,
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,

  // Product types
  GetProductsQuery,
  GetProductQuery,
  GetProductQueryVariables,
  CreateProductMutation,
  CreateProductMutationVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  DeleteProductMutation,
  DeleteProductMutationVariables,

  // Bill types
  GetBillsQuery,
  GetMyBillsQuery,
  GetBillQuery,
  GetBillQueryVariables,
  CreateBillMutation,
  CreateBillMutationVariables,
  UpdateBillMutation,
  UpdateBillMutationVariables,
  DeleteBillMutation,
  DeleteBillMutationVariables,

  // Stats types
  GetMonthlyStatsQuery,
  GetMonthlyStatsQueryVariables,
  GetMyMonthlyStatsQuery,
  GetMyMonthlyStatsQueryVariables,

  // Entity types
  User,
  Firm,
  Product,
  Bill,
  BillItem,
  UserRole,
  AuthResponse,
  MonthlyStats,
} from "./graphql";
