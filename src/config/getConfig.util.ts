import { APP_CONFIG } from './../constants/app.config.constant';
import { PrismaService } from 'src/prisma/prisma.service';

export async function getConfigUtil(
  prisma: PrismaService,
  key: keyof typeof APP_CONFIG,
) {
  const config = await prisma.config.findUnique({ where: { key } });
  if (!config) return null;

  // Parse the value based on its type
  switch (config.type) {
    case 'BOOLEAN':
      return JSON.parse(config.value) as boolean;
    case 'NUMBER':
      return Number(config.value);
    case 'JSON':
      return JSON.parse(config.value);
    default:
      return config.value; // STRING by default
  }
}
