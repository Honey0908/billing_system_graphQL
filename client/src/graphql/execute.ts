import type { TypedDocumentString } from "./graphql";

interface ExecuteOptions {
  headers?: Record<string, string>;
  skipAuth?: boolean; // Option to skip automatic auth header
}

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables,
  options?: ExecuteOptions
) {
  console.log(query, "execute");

  // Automatically get token from localStorage
  const token = localStorage.getItem("token");
  const authHeaders: Record<string, string> = {};

  // Add Authorization header if token exists and skipAuth is not true
  if (token && !options?.skipAuth) {
    authHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
      ...authHeaders,
      ...options?.headers, // Allow overriding headers if needed
    },
    body: JSON.stringify({
      query: query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json as { data: TResult };
}
