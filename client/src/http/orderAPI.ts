import { IOrder } from './../types/order';
import { ICartPosition } from './../types/device';
import { authHost } from '.';

interface GetOrderResponse {
  message: string;
  payload: {
    items: ICartPosition[];
    order: IOrder;
  };
}

export const postOrder = async (details: string, items: ICartPosition[]) => {
  const { data } = await authHost.post(`/order`, {
    details,
    items,
  });
  return data.payload;
};

export const getOrder = async (id: number) => {
  const { data } = await authHost.get<GetOrderResponse>(`/order/${id}`);
  return data.payload;
};
