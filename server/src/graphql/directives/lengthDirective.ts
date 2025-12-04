import { GraphQLError } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export function lengthDirective(directiveName: string = 'length') {
  return (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (directive) {
          const { min, max } = directive as { min?: number; max?: number };
          const { resolve = defaultFieldResolver } = fieldConfig;

          fieldConfig.resolve = async function (source, args, context, info) {
            // Validate all string arguments
            for (const [argName, argValue] of Object.entries(args)) {
              if (typeof argValue === 'string') {
                if (min !== undefined && argValue.length < min) {
                  throw new GraphQLError(
                    `Argument '${argName}' must be at least ${min} characters long`,
                    {
                      extensions: {
                        code: 'BAD_USER_INPUT',
                        argumentName: argName,
                        constraint: 'min',
                        value: min,
                      },
                    }
                  );
                }
                if (max !== undefined && argValue.length > max) {
                  throw new GraphQLError(
                    `Argument '${argName}' must be at most ${max} characters long`,
                    {
                      extensions: {
                        code: 'BAD_USER_INPUT',
                        argumentName: argName,
                        constraint: 'max',
                        value: max,
                      },
                    }
                  );
                }
              }
            }

            return resolve(source, args, context, info);
          };
        }
        return fieldConfig;
      },
    });
  };
}

function defaultFieldResolver(source: any, args: any, context: any, info: any) {
  if (
    typeof source === 'object' &&
    source !== null &&
    info.fieldName in source
  ) {
    return source[info.fieldName];
  }
}
