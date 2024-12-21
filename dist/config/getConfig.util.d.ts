import { APP_CONFIG } from './../constants/app.config.constant';
import { PrismaService } from 'src/prisma/prisma.service';
export declare function getConfigUtil(prisma: PrismaService, key: keyof typeof APP_CONFIG): Promise<any>;
