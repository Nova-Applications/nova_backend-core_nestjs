import { EntityBase } from '../../../shared/entity.base';
import { FacilityImageItemModel } from './facility-image-item';
import { FacilityUserModel } from './facility-user';

export class FacilityModel extends EntityBase {
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
