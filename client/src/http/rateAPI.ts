import { host, authHost } from '.';
import { IDevice } from '../types/device';

interface PostRateResponse {
  message: string;
  payload: IDevice;
}

export const postRate = async (deviceId: number, rate: number) => {
  const { data } = await authHost.post<PostRateResponse>(`/rate/${deviceId}`, {
    rate,
  });
  return data.payload;
};

export const getMyRate = async (deviceId: number) => {
  const { data } = await authHost.get(`/rate/${deviceId}`);
  return data.payload;
};

export const getTotalRate = async (deviceId: number) => {
  const { data } = await host.get(`/rate/${deviceId}/summary`);
  return data.payload;
};
