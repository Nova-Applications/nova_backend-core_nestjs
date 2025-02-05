import { FileUpload } from '../../../../shared/storage/blob-storage.client';

export class AddFacilityImageCommand {
  constructor(
    public readonly userId: string,
    public readonly facilityId: string,
    public readonly file: FileUpload,
  ) {}
}
