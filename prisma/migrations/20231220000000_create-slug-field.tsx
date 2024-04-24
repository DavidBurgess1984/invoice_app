import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const up = async (prisma: PrismaClient) => {
  await prisma.$executeRaw`ALTER TABLE invoices ADD COLUMN slug VARCHAR(255);`;

  // Set default values for existing records
  const invoices = await prisma.invoice.findMany();
  for (const invoice of invoices) {
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { slug: `inv-${invoice.id}` },
    });
  }
};

export const down = async (prisma: PrismaClient) => {
  await prisma.$executeRaw`ALTER TABLE invoices DROP COLUMN slug;`;
};
