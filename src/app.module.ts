import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environment from './config/environment.config';
import app from './config/app.config';
import database from './config/database.config';
import { FacilityModule } from './modules/facilities/facility.module';
import { JwtModule } from '@nestjs/jwt';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment, database, app],
    }),
    FacilityModule,
    AddressModule
  ],
})
export class AppModule {}
