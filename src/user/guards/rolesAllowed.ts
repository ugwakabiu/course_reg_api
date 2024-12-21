import { Reflector } from '@nestjs/core';
import { Role as RoleEnum } from '@prisma/client';

export const RolesAllowed = Reflector.createDecorator<RoleEnum[]>();
