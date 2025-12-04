import { GraphQLError } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { Context } from '../../context.js';

export function authDirective(directiveName: string = 'auth') {
  return (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (directive) {
          const { resolve = defaultFieldResolver } = fieldConfig;

          fieldConfig.resolve = async function (
            source,
            args,
            context: Context,
            info
          ) {
            if (!context.user) {
              throw new GraphQLError('Not authenticated', {
                extensions: {
                  code: 'UNAUTHENTICATED',
                  http: { status: 401 },
                },
              });
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
