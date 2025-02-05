export class CreateFacilityCommand {
  constructor(
    public readonly title: string,
    public readonly address: string,
    public readonly ubigeo: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly capacity: number,
    public readonly courtsTotal: number,
    public readonly createdBy: string,
  ) {}
}
