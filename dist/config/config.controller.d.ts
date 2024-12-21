import { ConfigService } from './config.service';
import { UpdateConfigDto } from './validation/config.validation';
export declare class ConfigController {
    private readonly configService;
    constructor(configService: ConfigService);
    update(body: UpdateConfigDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    get(): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
}
