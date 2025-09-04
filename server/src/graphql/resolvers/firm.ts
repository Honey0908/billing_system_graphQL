import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database.js'; // adjust path

export const Mutation = {
  async signUpFirm(_: unknown, args: any) {
    const {
      firmName,
      firmEmail,
      firmAddress,
      firmPhone,
      adminEmail,
      adminPassword,
      adminName,
    } = args;

    // Check if firm already exists
    const existingFirm = await prisma.firm.findUnique({
      where: { email: firmEmail },
    });
    if (existingFirm) {
      throw new Error('Firm with this email already exists');
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create firm + admin user together
    const firm = await prisma.firm.create({
      data: {
        name: firmName,
        email: firmEmail,
        address: firmAddress,
        phone: firmPhone,
        users: {
          create: {
            email: adminEmail,
            name: adminName,
            password: hashedPassword,
            role: 'ADMIN',
          },
        },
      },
      include: { users: true },
    });

    // Get admin user
    const adminUser = firm.users.find((u) => u.role === 'ADMIN');
    if (!adminUser) throw new Error('Admin user creation failed');

    // Generate JWT
    const token = jwt.sign(
      { userId: adminUser.id, firmId: firm.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return auth payload
    return {
      token,
      user: adminUser,
      firm,
    };
  },
};
