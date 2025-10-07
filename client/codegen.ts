import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql/",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__generated__/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        // "typescript-react-apollo",
      ],
      config: {
        withHooks: false, // Disable hook generation
        withHOC: false, // Disable HOC generation
        withComponent: false, // Disable component generation
        skipTypename: false,
        withResultType: true,
        documentVariablePrefix: "",
        documentVariableSuffix: "Document",
      },
    },
  },
};

export default config;
