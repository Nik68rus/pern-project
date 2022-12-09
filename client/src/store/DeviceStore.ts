import { IDevice, ITypeBrand } from './../types/device';
import { makeAutoObservable } from 'mobx';

export class DeviceStore {
  types: ITypeBrand[];
  brands: ITypeBrand[];
  devices: IDevice[];
  selectedType: number | null;
  selectedBrand: number | null;

  constructor() {
    this.types = [
      { id: 1, name: 'Холодильники' },
      { id: 2, name: 'Смартфоны' },
      { id: 3, name: 'Телевизоры' },
      { id: 4, name: 'Планшеты' },
      { id: 5, name: 'Ноутбуки' },
    ];
    this.brands = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Samsung' },
      { id: 3, name: 'Lenovo' },
      { id: 4, name: 'HP' },
    ];
    this.devices = [
      {
        id: 1,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
      {
        id: 2,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
      {
        id: 3,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
      {
        id: 4,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
      {
        id: 5,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
      {
        id: 6,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
      {
        id: 7,
        name: 'Iphone 13 pro max',
        price: 1299,
        rating: 5,
        img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
        typeId: 2,
        brandId: 1,
      },
    ];
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

  setSelectedType(id: number) {
    this.selectedType = id;
  }

  setSelectedBrand(id: number) {
    this.selectedBrand = id;
  }
}

export default new DeviceStore();
