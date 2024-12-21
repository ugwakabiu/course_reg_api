import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateConfigDto } from './validation/config.validation';
export declare class ConfigService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    update(data: UpdateConfigDto): Promise<void>;
    get(): Promise<{
        session: any;
        semester: any;
        allowDataUpdate: any;
        allowLogin: any;
    }>;
}
