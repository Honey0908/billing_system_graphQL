import type { TypedDocumentString } from "./graphql";

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
}

export async function graphqlRequest<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Add auth token if exists
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
    body: JSON.stringify({
      query: document.toString(),
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: GraphQLResponse<TResult> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error("No data received from GraphQL query");
  }

  return result.data;
}
