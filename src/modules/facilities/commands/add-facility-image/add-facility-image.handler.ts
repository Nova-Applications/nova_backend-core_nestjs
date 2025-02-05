import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BlobStorageClient,
  FileUpload,
} from '../../../../shared/storage/blob-storage.client';
import { ConfigService } from '@nestjs/config';
import { AddFacilityImageCommand } from './add-facility-image.command';
import { FacilityRepository } from '../../services/facility.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AddFacilityImageCommand)
export class AddFacilityImageHandler
  implements ICommandHandler<AddFacilityImageCommand>
{
  private readonly blobStorageClient: BlobStorageClient;

  constructor(
    private configService: ConfigService,
    private facilityRepository: FacilityRepository,
  ) {
    this.blobStorageClient = new BlobStorageClient(configService);
  }

  async execute(command: AddFacilityImageCommand): Promise<boolean> {
    try {
      const facility = await this.facilityRepository.getByIdAsync(
        command.facilityId,
      );
      if (!facility) {
        throw new NotFoundException();
      }

      if (facility.createdBy != command.userId) {
        throw new NotFoundException();
      }

      const imageUrl = await this.blobStorageClient.uploadFile(command.file);
      await this.facilityRepository.addFacilityImage(
        facility,
        command.file.name,
        imageUrl,
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}
