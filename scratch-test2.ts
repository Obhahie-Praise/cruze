import { PrismaClient } from './prisma/generated';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL } as any);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    const res = await prisma.user.findFirst();
    console.log("Success:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
