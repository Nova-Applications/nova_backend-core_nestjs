export class DeleteFacilityImageCommand {
  constructor(
    public readonly userId: string,
    public readonly facilityId: string,
    public readonly imageId: string,
  ) {}
}
