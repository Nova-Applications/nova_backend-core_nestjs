import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FacilityRepository } from '../../services/facility.repository';
import { DeleteFacilityImageCommand } from './delete-facility-image.command';
import { BlobStorageClient } from '../../../../shared/storage/blob-storage.client';
import { ConfigService } from '@nestjs/config';

@CommandHandler(DeleteFacilityImageCommand)
export class DeleteFacilityImageHandler
  implements ICommandHandler<DeleteFacilityImageCommand>
{
  private readonly blobStorageClient: BlobStorageClient;

  constructor(
    private facilityRepository: FacilityRepository,
    private configService: ConfigService,
  ) {
    this.blobStorageClient = new BlobStorageClient(configService);
  }

  async execute(command: DeleteFacilityImageCommand): Promise<boolean> {
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

      const blobName = command.imageId + '.webp';
      const isSucess = await this.blobStorageClient.delete(blobName);
      if (!isSucess) {
        throw new NotFoundException();
      }

      await this.facilityRepository.deleteFacilityImage(
        facility,
        command.imageId,
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}
