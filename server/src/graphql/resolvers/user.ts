import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database.js';
import { Context } from '../../context.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not configured');
}

function excludePassword<T extends { password: string }>(user: T) {
  const { password, ...rest } = user;
  return rest;
}

export const Query = {
  async me(_: unknown, __: unknown, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const user = await prisma.user.findUnique({
      where: { id: context.user.userId },
      include: { firm: true },
    });

    if (!user) throw new Error('User not found');

    return excludePassword(user);
  },

  async users(_: unknown, __: unknown, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const users = await prisma.user.findMany({
      where: { firmId: context.user.firmId },
      include: { firm: true },
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => excludePassword(user));
  },
};

export const Mutation = {
  //  Login Mutation
  async login(_: unknown, args: { email: string; password: string }) {
    const { email, password } = args;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { firm: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, firmId: user.firmId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: excludePassword(user),
      firm: user.firm,
    };
  },

  //  Create User Mutation
  async createUser(
    _: unknown,
    args: {
      name: string;
      email: string;
      password: string;
      role: 'ADMIN' | 'STAFF';
    },
    context: Context
  ) {
    const { name, email, password, role } = args;

    if (!context.user) throw new Error('Not authenticated');

    const requestingUser = await prisma.user.findUnique({
      where: { id: context.user.userId },
    });

    if (!requestingUser || requestingUser.role !== 'ADMIN') {
      throw new Error('Only ADMIN can create new users');
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        firmId: context?.user?.firmId,
      },
      include: { firm: true },
    });

    return excludePassword(user);
  },

  //  Delete User Mutation
  async deleteUser(_: unknown, args: { id: string }, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const requestingUser = await prisma.user.findUnique({
      where: { id: context.user.userId },
    });

    if (!requestingUser || requestingUser.role !== 'ADMIN') {
      throw new Error('Only ADMIN can delete users');
    }

    // Prevent deleting self
    if (args.id === context.user.userId) {
      throw new Error('Cannot delete your own account');
    }

    const user = await prisma.user.findUnique({
      where: { id: args.id },
    });

    if (!user) throw new Error('User not found');

    // Check if user belongs to the same firm
    if (user.firmId !== context.user.firmId) {
      throw new Error('Cannot delete users from other firms');
    }

    await prisma.user.delete({
      where: { id: args.id },
    });

    return excludePassword(user);
  },
};
