import { FacilityImageItemModel } from '../../entities/facility-image-item';

export class FacilityInfoResult {
  id: string;
  title: string;
  address: string;
  district: string;
  province: string;
  department: string;
  ubigeo: string;
  latitude: number;
  longitude: number;
  capacity: number;
  courtsTotal: number;
  isPublished: boolean;
  images: FacilityImageItemModel[];
}
