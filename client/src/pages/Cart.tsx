import { observer } from 'mobx-react-lite';
import { useState, useEffect, useContext, useCallback } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Context } from '../App';
import CartItem from '../components/CartItem';
import { getCart } from '../http/cartAPI';
import { getBrands, getDevices, getTypes } from '../http/deviceAPI';
import { ICartDevice, ICartPosition } from '../types/device';
import classes from './Cart.module.scss';
import cx from 'classnames';
import { postOrder } from '../http/orderAPI';
import { toast } from 'react-toastify';
import { handleError } from '../helpers';

const Cart = observer(() => {
  const [loading, setLoading] = useState(true);
  const { cart, device } = useContext(Context);
  const [details, setDetails] = useState('');

  const getDeviceById = useCallback(
    (id: number) => {
      return device.devices.find((d) => d.id === id);
    },
    [device.devices]
  );

  const getTypeById = useCallback(
    (id: number) => {
      return device.types.find((d) => d.id === id)?.name;
    },
    [device.types]
  );

  const getBrandById = useCallback(
    (id: number) => {
      return device.brands.find((d) => d.id === id)?.name;
    },
    [device.brands]
  );

  useEffect(() => {
    const setData = async () => {
      setLoading(true);
      const devices = await getDevices();
      device.setDevices(devices.rows);
      const brands = await getBrands();
      device.setBrands(brands);
      const types = await getTypes();
      device.setTypes(types);
      const cartItems = await getCart();
      cart.setItems(cartItems);
      setLoading(false);
    };
    setData();
    return () => {
      cart.setItems([]);
    };
  }, [cart, device]);

  const deleteHandler = (id: number) => {
    cart.setItems(cart.items.filter((item) => item.id !== id));
  };

  const addHandler = (item: ICartDevice) => {
    cart.setItems([...cart.items, item]);
  };

  const getNormalizedCart = () => {
    const cartItems = cart.items.map((item) => getDeviceById(item.deviceId)!);
    const normalizedCart: ICartPosition[] = [];

    cartItems.forEach((item) => {
      console.log(item);

      const indexInCart = normalizedCart.findIndex((dev) => dev.id === item.id);
      if (indexInCart < 0) {
        normalizedCart.push({
          ...item,
          quantity: 1,
          type: getTypeById(item.typeId),
          brand: getBrandById(item.brandId),
        });
      } else {
        normalizedCart[indexInCart].quantity++;
      }
    });
    return normalizedCart;
  };

  const getTotal = () => {
    return getNormalizedCart().reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const handleOrder = async () => {
    try {
      await postOrder(details, getNormalizedCart());
      toast('Заказ создан');
      setDetails('');
      cart.setItems([]);
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return (
      <Container>
        <h4>Loading...</h4>
      </Container>
    );
  }

  if (!cart.items.length) {
    return (
      <Container>
        <h4>Здесь еще ничего нет!</h4>
      </Container>
    );
  }

  return (
    <Container className={classes.cart}>
      <h1 className="mb-5 mt-5">Корзина</h1>
      {getNormalizedCart().map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onAdd={addHandler}
          onDelete={deleteHandler}
        />
      ))}
      <h4 className={cx('mt-3', classes.total)}>Итого: {getTotal()} руб.</h4>
      <Form.Control
        placeholder="Введите информацию для доставки заказа"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <Button className="mt-5" variant="outline-dark" onClick={handleOrder}>
        Оформить заказ
      </Button>
    </Container>
  );
});

export default Cart;
