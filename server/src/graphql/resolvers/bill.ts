import prisma from '../../config/database.js';
import { Context } from '../../context.js';

interface BillItemInput {
  productId?: string;
  productName?: string;
  price?: number;
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

  async monthlyStats(
    _: unknown,
    args: { month: number; year: number },
    context: Context
  ) {
    if (!context.user) throw new Error('Not authenticated');

    const requestingUser = await prisma.user.findUnique({
      where: { id: context.user.userId },
    });

    if (!requestingUser || requestingUser.role !== 'ADMIN') {
      throw new Error('Only ADMIN can view firm statistics');
    }

    const { month, year } = args;

    // Validate month (1-12) and year
    if (month < 1 || month > 12) {
      throw new Error('Month must be between 1 and 12');
    }
    if (year < 2000 || year > 2100) {
      throw new Error('Invalid year');
    }

    // Calculate start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // month is 0-indexed in Date
    const endDate = new Date(year, month, 1); // First day of next month

    const bills = await prisma.bill.findMany({
      where: {
        firmId: context.user.firmId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        totalAmount: true,
      },
    });

    const billsCount = bills.length;
    const totalAmount = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    return {
      month,
      year,
      billsCount,
      totalAmount,
    };
  },

  async myMonthlyStats(
    _: unknown,
    args: { month: number; year: number },
    context: Context
  ) {
    if (!context.user) throw new Error('Not authenticated');

    const { month, year } = args;

    // Validate month (1-12) and year
    if (month < 1 || month > 12) {
      throw new Error('Month must be between 1 and 12');
    }
    if (year < 2000 || year > 2100) {
      throw new Error('Invalid year');
    }

    // Calculate start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // month is 0-indexed in Date
    const endDate = new Date(year, month, 1); // First day of next month

    const bills = await prisma.bill.findMany({
      where: {
        userId: context.user.userId,
        firmId: context.user.firmId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        totalAmount: true,
      },
    });

    const billsCount = bills.length;
    const totalAmount = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    return {
      month,
      year,
      billsCount,
      totalAmount,
    };
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

    // Validate all items have productName and price
    for (const item of items) {
      if (!item.productName || item.productName.trim() === '') {
        throw new Error('All items must have a product name');
      }
      if (!item.price || item.price <= 0) {
        throw new Error('All items must have a valid price');
      }
    }

    // Calculate total amount and prepare bill items
    let totalAmount = 0;
    const billItemsData = items.map((item) => {
      const itemTotal = item.price! * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: item.productId || undefined,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price!,
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

    // Validate all items have productName and price
    for (const item of items) {
      if (!item.productName || item.productName.trim() === '') {
        throw new Error('All items must have a product name');
      }
      if (!item.price || item.price <= 0) {
        throw new Error('All items must have a valid price');
      }
    }

    // Calculate new total and prepare bill items
    let totalAmount = 0;
    const billItemsData = items.map((item) => {
      const itemTotal = item.price! * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: item.productId || undefined,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price!,
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
