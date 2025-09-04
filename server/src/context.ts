import jwt from 'jsonwebtoken';

export interface Context {
  user: { userId: string; firmId: string } | null;
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
      user = { userId: decoded.userId, firmId: decoded.firmId };
    } catch (err) {
      console.warn('Invalid token:', err);
    }
  }

  return {
    user,
  };
}
