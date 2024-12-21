import { PrismaService } from 'src/prisma/prisma.service';
type Args = {
    prisma: PrismaService;
    key: string;
    value: any;
    description?: string;
};
export declare function setConfigUtil({ key, prisma, value }: Args): Promise<void>;
export {};
