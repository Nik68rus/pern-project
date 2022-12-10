import { IDevice, ITypeBrand } from './../types/device';
import { makeAutoObservable } from 'mobx';

export class DeviceStore {
  types: ITypeBrand[];
  brands: ITypeBrand[];
  devices: IDevice[];
  selectedType: number | null;
  selectedBrand: number | null;

  constructor() {
    this.types = [];
    this.brands = [];
    this.devices = [];
    this.selectedType = null;
    this.selectedBrand = null;
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
}

export default new DeviceStore();
