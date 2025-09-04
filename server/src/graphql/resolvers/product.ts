import prisma from '../../config/database.js';
import { Context } from '../../context.js';

export const Query = {
  async products(_: unknown, __: unknown, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    return await prisma.product.findMany({
      where: { firmId: context.user.firmId },
      include: { firm: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async product(_: unknown, args: { id: string }, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const product = await prisma.product.findUnique({
      where: { id: args.id },
      include: { firm: true },
    });

    if (!product) throw new Error('Product not found');

    if (product.firmId !== context.user.firmId) {
      throw new Error('Not authorized to view this product');
    }

    return product;
  },
};

export const Mutation = {
  async createProduct(
    _: unknown,
    args: { input: { name: string; price: number } },
    context: Context
  ) {
    if (!context.user) throw new Error('Not authenticated');

    const { name, price } = args.input;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        firmId: context.user.firmId,
      },
      include: { firm: true },
    });

    return product;
  },

  async updateProduct(
    _: unknown,
    args: { id: string; input: { name: string; price: number } },
    context: Context
  ) {
    if (!context.user) throw new Error('Not authenticated');

    const { name, price } = args.input;

    const existingProduct = await prisma.product.findUnique({
      where: { id: args.id },
    });

    if (!existingProduct) throw new Error('Product not found');

    if (existingProduct.firmId !== context.user.firmId) {
      throw new Error('Not authorized to update this product');
    }

    const product = await prisma.product.update({
      where: { id: args.id },
      data: { name, price },
      include: { firm: true },
    });

    return product;
  },

  async deleteProduct(_: unknown, args: { id: string }, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const existingProduct = await prisma.product.findUnique({
      where: { id: args.id },
    });

    if (!existingProduct) throw new Error('Product not found');

    if (existingProduct.firmId !== context.user.firmId) {
      throw new Error('Not authorized to delete this product');
    }

    await prisma.product.delete({
      where: { id: args.id },
    });

    return true;
  },
};
