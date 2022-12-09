export interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
}

export interface ITypeBrand {
  id: number;
  name: string;
}
