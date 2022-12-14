export type TOrderStatus = 'processing' | 'delivering' | 'finished';

export interface IOrder {
  id: number;
  details: string;
  status: TOrderStatus;
  createdAt: Date;
}
