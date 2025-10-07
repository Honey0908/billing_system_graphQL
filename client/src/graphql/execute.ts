import type { TypedDocumentString } from "./graphql";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  console.log(query, "00");
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
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
