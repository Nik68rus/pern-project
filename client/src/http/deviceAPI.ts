import { ITypeBrand, IDevice } from './../types/device';
import { host, authHost } from '.';

export interface IGetDeviceParams {
  brandId?: number;
  typeId?: number;
}

interface IBrandTypeResponse {
  message: string;
  payload: ITypeBrand[];
}

interface IGetDevicesResponse {
  message: string;
  payload: {
    count: number;
    rows: IDevice[];
  };
}

interface IDeviceResponse {
  message: string;
  payload: IDevice;
}

export const getBrands = async () => {
  const { data } = await host.get<IBrandTypeResponse>('/brand');
  return data.payload;
};

export const getTypes = async () => {
  const { data } = await host.get<IBrandTypeResponse>('/type');
  return data.payload;
};

export const getDevices = async (params?: IGetDeviceParams) => {
  let url = '/device';
  if (params) {
    const queryString = Object.keys(params)
      //@ts-ignore
      .map((key) => key + '=' + params[key])
      .join('&');
    url = url + '?' + queryString;
  }

  const { data } = await host.get<IGetDevicesResponse>(url);
  return data.payload;
};

export const getOneDevice = async (id: string) => {
  const { data } = await host.get<IDeviceResponse>('/device/' + id);
  return data.payload;
};

export const createBrand = async (name: string) => {
  const { data } = await authHost.post<IBrandTypeResponse>('/brand', { name });
  return data.payload;
};

export const createType = async (name: string) => {
  const { data } = await authHost.post<IBrandTypeResponse>('/type', { name });
  return data.payload;
};

export const createDevice = async (form: FormData) => {
  const { data } = await authHost.post<IDeviceResponse>('/device', form);
  return data.payload;
};
