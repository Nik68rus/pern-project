export interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
  info: { id: number; title: string; description: string }[];
}

export interface ITypeBrand {
  id: number;
  name: string;
}

export interface ICartDevice {
  id: number;
  deviceID: number;
  cartId: number;
}
