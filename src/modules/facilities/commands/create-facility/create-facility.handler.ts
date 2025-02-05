import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFacilityCommand } from './create-facility.command';
import { FacilityRepository } from '../../services/facility.repository';
import { FacilityModel } from '../../entities/facility';
import { NotFoundException } from '@nestjs/common';
import { AddressService } from '../../../address/services/address.service';

@CommandHandler(CreateFacilityCommand)
export class CreateFacilityHandler
  implements ICommandHandler<CreateFacilityCommand>
{
  constructor(
    private facilityRepository: FacilityRepository,
    private addressService: AddressService,
  ) {}

  async execute(command: CreateFacilityCommand): Promise<FacilityModel> {
    try {
      if (!command.ubigeo) {
        throw new NotFoundException();
      }

      const ubigeo = this.addressService.getAddressInfoByUbigeo(command.ubigeo);
      if (!ubigeo) {
        throw new NotFoundException();
      }

      const newEntity = new FacilityModel();
      newEntity.title = command.title;
      newEntity.address = command.address;
      newEntity.ubigeo = command.ubigeo;
      newEntity.district = ubigeo.district;
      newEntity.province = ubigeo.province;
      newEntity.department = ubigeo.department;
      newEntity.latitude = command.latitude;
      newEntity.longitude = command.longitude;
      newEntity.capacity = command.capacity;
      newEntity.courtsTotal = command.courtsTotal;
      newEntity.createdBy = command.createdBy;

      const entity = this.facilityRepository.createEntity(newEntity);
      return await this.facilityRepository.create(entity);
    } catch (error) {
      throw error;
    }
  }
}
