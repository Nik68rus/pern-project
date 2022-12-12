import { ICartDevice } from './../types/device';
import { authHost } from '.';

interface PostCartResponse {
  message: string;
  payload: ICartDevice;
}

export const postCart = async (deviceId: number) => {
  const { data } = await authHost.post<PostCartResponse>(`/cart`, {
    deviceId,
  });
  return data.payload;
};

export const getCart = async (deviceId: number) => {
  const { data } = await authHost.get('/cart');
  return data.payload;
};
