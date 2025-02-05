import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FacilityController } from './controllers/facility.controller';
import { FacilityRepository } from './services/facility.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../common/guards/role.guard';
import { CreateFacilityHandler } from './commands/create-facility/create-facility.handler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddressModule } from '../address/address.module';
import { FacilityInfoHandler } from './queries/facility-info/facility-info.handler';
import { AddFacilityImageHandler } from './commands/add-facility-image/add-facility-image.handler';
import { DeleteFacilityImageHandler } from './commands/delete-facility-image/delete-facility-image.handler';

export const CommandHandlers = [
  CreateFacilityHandler,
  FacilityInfoHandler,
  AddFacilityImageHandler,
  DeleteFacilityImageHandler,
];

export const Controllers = [FacilityController];
export const Repositories = [FacilityRepository];

@Module({
  imports: [
    CqrsModule,
    AddressModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('app.jwt.secret.key'),
        signOptions: {
          expiresIn: `${configService.get<string>('app.jwt.expirationDays')}d`,
        },
      }),
    }),
  ],
  controllers: [...Controllers],
  providers: [
    ...Repositories,
    ...CommandHandlers,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [JwtModule, ...Repositories, ...CommandHandlers],
})
export class FacilityModule {}
