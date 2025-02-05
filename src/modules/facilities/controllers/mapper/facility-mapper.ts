import { FacilityModel } from '../../entities/facility';
import { FacilityInfoResult } from '../models/facility-info.result';

const mapFacilityToResult = (facility: FacilityModel): FacilityInfoResult => {
  return {
    id: facility.id,
    title: facility.title,
    address: facility.address,
    district: facility.district,
    province: facility.province,
    department: facility.department,
    ubigeo: facility.ubigeo,
    latitude: facility.latitude,
    longitude: facility.longitude,
    capacity: facility.capacity,
    courtsTotal: facility.courtsTotal,
    isPublished: facility.isPublished,
    images: facility.images,
  };
};

export { mapFacilityToResult };
