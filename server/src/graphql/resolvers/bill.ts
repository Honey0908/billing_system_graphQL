import prisma from '../../config/database.js';
import { Context } from '../../context.js';

interface BillItemInput {
  productId: string;
  quantity: number;
}

interface CreateBillInput {
  title: string;
  customerName?: string;
  customerPhone?: string;
  items: BillItemInput[];
}

export const Query = {
  async bills(_: unknown, __: unknown, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const requestingUser = await prisma.user.findUnique({
      where: { id: context.user.userId },
    });

    if (!requestingUser || requestingUser.role !== 'ADMIN') {
      throw new Error('Only ADMIN can view all bills');
    }

    return await prisma.bill.findMany({
      where: { firmId: context.user.firmId },
      include: {
        user: { include: { firm: true } },
        firm: true,
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async bill(_: unknown, args: { id: string }, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const bill = await prisma.bill.findUnique({
      where: { id: args.id },
      include: {
        user: { include: { firm: true } },
        firm: true,
        items: {
          include: { product: true },
        },
      },
    });

    if (!bill) throw new Error('Bill not found');

    if (bill.firmId !== context.user.firmId) {
      throw new Error('Not authorized to view this bill');
    }

    return bill;
  },

  async myBills(_: unknown, __: unknown, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    return await prisma.bill.findMany({
      where: {
        userId: context.user.userId,
        firmId: context.user.firmId,
      },
      include: {
        user: { include: { firm: true } },
        firm: true,
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },
};

export const Mutation = {
  async createBill(
    _: unknown,
    args: { input: CreateBillInput },
    context: Context
  ) {
    if (!context.user) throw new Error('Not authenticated');

    const { title, customerName, customerPhone, items } = args.input;

    if (!items || items.length === 0) {
      throw new Error('Bill must have at least one item');
    }

    // Validate that all products exist and belong to the user's firm
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        firmId: context.user.firmId,
      },
    });

    if (products.length !== productIds.length) {
      throw new Error('Some products not found or not accessible');
    }

    // Calculate total amount
    let totalAmount = 0;
    const billItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      };
    });

    // Create bill with items in a transaction
    const bill = await prisma.$transaction(async (tx) => {
      const newBill = await tx.bill.create({
        data: {
          title,
          customerName,
          customerPhone,
          totalAmount,
          userId: context.user.userId,
          firmId: context.user.firmId,
        },
      });

      await tx.billItem.createMany({
        data: billItemsData.map((item) => ({
          ...item,
          billId: newBill.id,
        })),
      });

      return await tx.bill.findUnique({
        where: { id: newBill.id },
        include: {
          user: { include: { firm: true } },
          firm: true,
          items: {
            include: { product: true },
          },
        },
      });
    });

    return bill;
  },

  async updateBill(
    _: unknown,
    args: { id: string; input: CreateBillInput },
    context: Context
  ) {
    if (!context.user) throw new Error('Not authenticated');

    const existingBill = await prisma.bill.findUnique({
      where: { id: args.id },
    });

    if (!existingBill) throw new Error('Bill not found');

    if (existingBill.firmId !== context.user.firmId) {
      throw new Error('Not authorized to update this bill');
    }

    const { title, customerName, customerPhone, items } = args.input;

    if (!items || items.length === 0) {
      throw new Error('Bill must have at least one item');
    }

    // Validate products
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        firmId: context.user.firmId,
      },
    });

    if (products.length !== productIds.length) {
      throw new Error('Some products not found or not accessible');
    }

    // Calculate new total
    let totalAmount = 0;
    const billItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      };
    });

    // Update bill in transaction
    const bill = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.billItem.deleteMany({
        where: { billId: args.id },
      });

      // Update bill
      await tx.bill.update({
        where: { id: args.id },
        data: {
          title,
          customerName,
          customerPhone,
          totalAmount,
        },
      });

      // Create new items
      await tx.billItem.createMany({
        data: billItemsData.map((item) => ({
          ...item,
          billId: args.id,
        })),
      });

      return await tx.bill.findUnique({
        where: { id: args.id },
        include: {
          user: { include: { firm: true } },
          firm: true,
          items: {
            include: { product: true },
          },
        },
      });
    });

    return bill;
  },

  async deleteBill(_: unknown, args: { id: string }, context: Context) {
    if (!context.user) throw new Error('Not authenticated');

    const existingBill = await prisma.bill.findUnique({
      where: { id: args.id },
    });

    if (!existingBill) throw new Error('Bill not found');

    if (existingBill.firmId !== context.user.firmId) {
      throw new Error('Not authorized to delete this bill');
    }

    await prisma.$transaction(async (tx) => {
      await tx.billItem.deleteMany({
        where: { billId: args.id },
      });

      await tx.bill.delete({
        where: { id: args.id },
      });
    });

    return true;
  },
};
