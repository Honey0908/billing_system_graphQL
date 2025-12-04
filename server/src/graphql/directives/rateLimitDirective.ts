import { GraphQLError } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { Context } from '../../context.js';

// Simple in-memory rate limiter (for production, use Redis)
interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const rateLimitStore: RateLimitStore = {};

export function rateLimitDirective(directiveName: string = 'rateLimit') {
  return (schema: GraphQLSchema) => {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (directive) {
          const { limit = 10, duration = 60 } = directive as {
            limit: number;
            duration: number;
          };
          const { resolve = defaultFieldResolver } = fieldConfig;

          fieldConfig.resolve = async function (
            source,
            args,
            context: Context,
            info
          ) {
            // Use user ID or IP address as key
            const key = context.user?.userId || 'anonymous';
            const now = Date.now();
            const windowKey = `${info.fieldName}:${key}`;

            // Initialize or reset if window expired
            if (
              !rateLimitStore[windowKey] ||
              now > rateLimitStore[windowKey].resetTime
            ) {
              rateLimitStore[windowKey] = {
                count: 0,
                resetTime: now + duration * 1000,
              };
            }

            // Check limit
            rateLimitStore[windowKey].count++;
            if (rateLimitStore[windowKey].count > limit) {
              const resetIn = Math.ceil(
                (rateLimitStore[windowKey].resetTime - now) / 1000
              );
              throw new GraphQLError(
                `Rate limit exceeded. Try again in ${resetIn} seconds.`,
                {
                  extensions: {
                    code: 'RATE_LIMIT_EXCEEDED',
                    http: { status: 429 },
                    resetIn,
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
