import { Injectable } from '@nestjs/common';
import { AddressInfoModel } from './models/address-info';
import ubigeos from '../mock/ubigeos.json';

@Injectable()
export class AddressService {
  constructor() {}

  public getAddressInfoByUbigeo(ubigeo: string): AddressInfoModel | null {
    return ubigeos.find((x) => x.ubigeo == ubigeo);
  }
}
