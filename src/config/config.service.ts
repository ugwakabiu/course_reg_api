import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateConfigDto } from './validation/config.validation';
import { setConfigUtil } from './setConfig.util';
import { getConfigUtil } from './getConfig.util';

@Injectable()
export class ConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(data: UpdateConfigDto) {
    const entries = Object.entries(data);

    for (let i = 0; i < entries.length; i++) {
      const current = entries[i];
      await setConfigUtil({
        key: current[0],
        value: current[1],
        prisma: this.prismaService,
      });
    }
  }

  async get() {
    const session = await getConfigUtil(this.prismaService, 'session');
    const semester = await getConfigUtil(
      this.prismaService,
      'current_semester',
    );
    const allowLogin = await getConfigUtil(this.prismaService, 'allow_login');
    const allowDataUpdate = await getConfigUtil(
      this.prismaService,
      'allow_data_update',
    );
    return { session, semester, allowDataUpdate, allowLogin };
  }
}
