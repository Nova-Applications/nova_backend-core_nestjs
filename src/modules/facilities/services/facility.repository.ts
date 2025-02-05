import { Injectable } from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { BaseRepository } from '../../../shared/repository.base';
import { FacilityModel } from '../../facilities/entities/facility';
import { ConfigService } from '@nestjs/config';
import { FacilityImageItemModel } from '../entities/facility-image-item';

@Injectable()
export class FacilityRepository extends BaseRepository<FacilityModel> {
  constructor(private readonly configService: ConfigService) {
    super(
      configService.get<string>('database.cosmos.endpoint'),
      configService.get<string>('database.cosmos.apiKey'),
      configService.get<string>('database.cosmos.dbId'),
      configService.get<string>('database.cosmos.dbFacility'),
    );
  }

  public async getByIdAsync(id: string): Promise<FacilityModel> {
    const query = `select * from c where c.id = '${id}'`;
    const result = await this.query(query);
    return result ? result[0] : null;
  }

  public createEntity(model: FacilityModel): FacilityModel {
    const newEntity = new FacilityModel();
    newEntity.id = Guid.create().toString();
    newEntity.title = model.title;
    newEntity.address = model.address;

    newEntity.ubigeo = model.ubigeo;
    newEntity.district = model.district;
    newEntity.province = model.province;
    newEntity.department = model.department;
    newEntity.latitude = model.latitude;
    newEntity.longitude = model.longitude;
    newEntity.courtsTotal = model.courtsTotal;

    newEntity.images = [];
    newEntity.isPublished = false;

    newEntity.createdAt = new Date().toISOString();
    newEntity.createdBy = model.createdBy ?? 'SYSTEM';

    return newEntity;
  }

  public updateEntity(
    oldEntity: FacilityModel,
    newEntity: FacilityModel,
  ): FacilityModel {
    newEntity.id = Guid.create().toString();
    newEntity.title = newEntity.title ?? oldEntity.title;
    newEntity.address = newEntity.address ?? oldEntity.address;

    newEntity.ubigeo = newEntity.ubigeo ?? oldEntity.ubigeo;
    newEntity.district = newEntity.district ?? oldEntity.district;
    newEntity.province = newEntity.province ?? oldEntity.province;
    newEntity.department = newEntity.department ?? oldEntity.department;
    newEntity.latitude = newEntity.latitude ?? oldEntity.latitude;
    newEntity.longitude = newEntity.longitude ?? oldEntity.longitude;
    newEntity.courtsTotal = newEntity.courtsTotal ?? oldEntity.courtsTotal;

    newEntity.images = oldEntity.images;
    newEntity.isPublished = oldEntity.isPublished;

    newEntity.updatedAt = new Date().toISOString();
    newEntity.updatedBy =
      newEntity.updatedBy ?? oldEntity.updatedBy ?? 'SYSTEM';

    return newEntity;
  }

  public async addFacilityImage(
    entity: FacilityModel,
    imageId: string,
    imageUrl: string,
  ) {
    const item = new FacilityImageItemModel();
    item.id = imageId;
    item.imageUrl = imageUrl;

    entity.images.push(item);

    await this.update(entity.id, entity);
  }

  public async deleteFacilityImage(entity: FacilityModel, imageId: string) {
    entity.images = entity.images.filter((item) => item.id !== imageId);
    await this.update(entity.id, entity);
  }
}
