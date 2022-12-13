import { ICartDevice } from './../types/device';
import { authHost } from '.';

interface PostCartResponse {
  message: string;
  payload: ICartDevice;
}

interface DeleteCartResponse {
  message: string;
  payload: number;
}

interface GetCartResponse {
  message: string;
  payload: ICartDevice[];
}

export const postCart = async (deviceId: number) => {
  const { data } = await authHost.post<PostCartResponse>(`/cart`, {
    deviceId,
  });
  return data.payload;
};

export const getCart = async () => {
  const { data } = await authHost.get<GetCartResponse>('/cart');
  return data.payload;
};

export const deleteCart = async (deviceId: number) => {
  const { data } = await authHost.delete<DeleteCartResponse>(
    `/cart/${deviceId}`
  );
  return data.payload;
};
