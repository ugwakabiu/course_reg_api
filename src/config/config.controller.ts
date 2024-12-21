import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RoleGuard } from 'src/user/guards/role.guard';
import { RolesAllowed } from 'src/user/guards/rolesAllowed';
import { ConfigService } from './config.service';
import {
  UpdateConfigDto,
  updateConfigValidation,
} from './validation/config.validation';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import { resMsgUtil } from 'src/utils/resMsg.util';

@UseGuards(AuthGuard)
@RolesAllowed(['admin'])
@UseGuards(RoleGuard)
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(updateConfigValidation))
  async update(@Body() body: UpdateConfigDto) {
    await this.configService.update(body);
    return resMsgUtil('Config updated successfully');
  }

  @Get()
  async get() {
    const config = await this.configService.get();
    return resMsgUtil('Config fetched successfully', config);
  }
}
