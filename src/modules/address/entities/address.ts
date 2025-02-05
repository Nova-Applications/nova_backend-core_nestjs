import { EntityBase } from '../../../shared/entity.base';

export class AddressModel extends EntityBase {
  address: string;
  district: string;
  province: string;
  department: string;
  ubigeo: string;
  latitude: number;
  longitude: number;
}
