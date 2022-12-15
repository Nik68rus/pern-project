import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import OrderItem from '../components/OrderItem';
import { handleError } from '../helpers';
import { getMyOrders } from '../http/orderAPI';
import { IOrder } from '../types/order';

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getMyOrders()
      .then((data) => setOrders(data))
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!loading && !orders.length) {
    return (
      <Container>
        <h4>Здесь ничего нет</h4>
      </Container>
    );
  }

  return (
    <Container>
      <ul className="mt-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </Container>
  );
};

export default Orders;
