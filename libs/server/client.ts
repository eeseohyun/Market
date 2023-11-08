import { PrismaClient } from '@prisma/client';

export const client = new PrismaClient();

client.user.create({
  data: {
    email: 'abcd@naver.com',
    name: 'abcd',
  },
});
