import jwt from 'jsonwebtoken';
import prisma from './config/database.js';

export interface Context {
  user: { userId: string; firmId: string; role?: string } | null;
}

export async function createContext({ req }: { req: any }): Promise<Context> {
  // Extract token from Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        firmId: string;
      };

      // Optionally fetch user role from database for better caching
      // This is useful if you need role info frequently
      const userRecord = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { role: true },
      });

      user = {
        userId: decoded.userId,
        firmId: decoded.firmId,
        role: userRecord?.role,
      };
    } catch (err) {
      console.warn('Invalid token:', err);
    }
  }

  return {
    user,
  };
}
