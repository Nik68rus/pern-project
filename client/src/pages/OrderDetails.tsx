import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate, useParams } from 'react-router-dom';
import { handleError } from '../helpers';
import { getOneDevice } from '../http/deviceAPI';
import { getOrder } from '../http/orderAPI';
import { IDevice } from '../types/device';
import { IOrder, IOrderDevice } from '../types/order';
import { RoutePath } from '../types/routes';

type Props = {};

interface IOrderDetails {
  items: IOrderDevice[];
  order: IOrder;
}

const OrderDetails = (props: Props) => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<IOrderDetails | null>(null);
  const [orderItems, setOrderItems] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      getOrder(+orderId)
        .then((data) => setOrder(data))
        .catch((err) => handleError(err, '404'))
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  useEffect(() => {
    const getDevices = async () => {
      setLoading(true);
      try {
        if (order) {
          const items = await Promise.all(
            order.items.map((item) => getOneDevice(item.deviceId.toString()))
          );
          setOrderItems(items);
        } else {
          setOrderItems([]);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getDevices();
  }, [order]);

  const getQuantity = (id: number) => {
    const item = order?.items.find((item) => item.deviceId === id);
    return item ? item.quantity : 0;
  };

  const getName = (id: number) => {
    const item = orderItems.find((item) => item.id === id);
    return item ? item.name : 'N/A';
  };

  console.log(order);
  console.log(orderItems);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Not found</p>;
  }

  return (
    <Container>
      <h1 className="mt-3">
        Заказ {order.order.id} от{' '}
        {new Date(order.order.createdAt).toLocaleDateString('ru-RU')}
      </h1>
      <ul>
        {order.items.map((device) => (
          <li key={device.id}>
            {getName(device.deviceId)} - {device.price} * {device.quantity} -{' '}
            {device.price * device.quantity}
          </li>
        ))}
      </ul>
      <h4>
        Итого:{' '}
        {order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h4>
      <Link to={RoutePath.ORDERS}>Назад</Link>
    </Container>
  );
};

export default OrderDetails;
