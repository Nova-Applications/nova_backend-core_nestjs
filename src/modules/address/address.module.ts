import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddressService } from './services/address.service';
import { ConfigModule } from '@nestjs/config';

export const Services = [AddressService];

@Module({
  imports: [ConfigModule, CqrsModule],
  providers: [...Services],
  exports: [...Services],
})
export class AddressModule {}
