import { IDevice, ITypeBrand } from './../types/device';
import { makeAutoObservable } from 'mobx';

export class DeviceStore {
  types: ITypeBrand[];
  brands: ITypeBrand[];
  devices: IDevice[];
  selectedType: number | null;
  selectedBrand: number | null;
  selectedDevice: number | null;
  page: number;
  totalCount: number;
  limit: number;

  constructor() {
    this.types = [];
    this.brands = [];
    this.devices = [];
    this.page = 1;
    this.totalCount = 0;
    this.limit = 3;
    this.selectedType = null;
    this.selectedBrand = null;
    this.selectedDevice = null;
    makeAutoObservable(this);
  }

  setTypes(types: ITypeBrand[]) {
    this.types = types;
  }

  setBrands(brands: ITypeBrand[]) {
    this.brands = brands;
  }

  setDevices(devices: IDevice[]) {
    this.devices = devices;
  }

  setSelectedType(id: number | null) {
    this.selectedType = id;
  }

  setSelectedBrand(id: number | null) {
    this.selectedBrand = id;
  }

  setSelectedDevice(id: number | null) {
    this.selectedDevice = id;
  }

  setPage(n: number) {
    this.page = n;
  }

  setLimit(n: number) {
    this.limit = n;
  }
  setTotalCount(n: number) {
    this.totalCount = n;
  }
}

export default new DeviceStore();
