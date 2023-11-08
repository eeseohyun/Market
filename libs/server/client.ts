import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.user.create({
  data: {
    email: 'abcd@naver.com',
    name: 'abcd',
  },
});
