import { GraphQLError } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { Context } from '../../context.js';
import prisma from '../../config/database.js';

export function hasRoleDirective(directiveName: string = 'hasRole') {
  return (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (directive) {
          const { roles } = directive as { roles: string[] };
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

            // Fetch user role from database
            const user = await prisma.user.findUnique({
              where: { id: context.user.userId },
              select: { role: true },
            });

            if (!user || !roles.includes(user.role)) {
              throw new GraphQLError(
                `You must have one of the following roles: ${roles.join(', ')}`,
                {
                  extensions: {
                    code: 'FORBIDDEN',
                    http: { status: 403 },
                    requiredRoles: roles,
                  },
                }
              );
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
