import { PrismaService } from 'src/prisma/prisma.service';

type Args = {
  prisma: PrismaService;
  key: string;
  value: any;
  description?: string;
};

export async function setConfigUtil({ key, prisma, value }: Args) {
  const type: any = (typeof value).toUpperCase();

  const formattedValue = type === 'STRING' ? value : JSON.stringify(value);

  await prisma.config.upsert({
    where: { key },
    update: { value: formattedValue },
    create: { key, value: formattedValue, type },
  });
}
