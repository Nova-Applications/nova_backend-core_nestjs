import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { FacilityInfoQuery } from './facility-info.query';
import { FacilityInfoResult } from '../../controllers/models/facility-info.result';
import { FacilityRepository } from '../../services/facility.repository';
import { mapFacilityToResult } from '../../controllers/mapper/facility-mapper';

@QueryHandler(FacilityInfoQuery)
export class FacilityInfoHandler implements IQueryHandler<FacilityInfoQuery> {
  constructor(private facilityRepository: FacilityRepository) {}

  async execute(query: FacilityInfoQuery): Promise<FacilityInfoResult> {
    try {
      const facility = await this.facilityRepository.getByIdAsync(
        query.facilityId,
      );
      if (!facility) {
        throw new NotFoundException();
      }

      if (facility.createdBy != query.userId) {
        throw new NotFoundException();
      }

      return mapFacilityToResult(facility);
    } catch (error) {
      throw error;
    }
  }
}
