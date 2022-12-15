import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '../types/order';
import { RoutePath } from '../types/routes';

type Props = {
  order: IOrder;
};

const OrderItem = ({ order }: Props) => {
  const navigate = useNavigate();
  return (
    <li className="mb-3">
      Заказ {order.id} от{' '}
      {new Date(order.createdAt).toLocaleDateString('ru-RU')}{' '}
      <Button
        className="ml-5"
        onClick={() => navigate(RoutePath.ORDERS + '/' + order.id)}
      >
        Детали
      </Button>
    </li>
  );
};

export default OrderItem;
