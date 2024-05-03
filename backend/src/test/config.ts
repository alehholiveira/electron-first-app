import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  // Use o método `deleteMany()` para deletar todos os registros da tabela_de_teste
  await prisma.userTest.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

export default prisma;
