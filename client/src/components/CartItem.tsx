import { useState } from 'react';
import { ICartDevice, ICartPosition } from '../types/device';
import classes from './CartItem.module.scss';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import { deleteCart, postCart } from '../http/cartAPI';

interface Props {
  item: ICartPosition;
  onAdd: (item: ICartDevice) => void;
  onDelete: (id: number) => void;
}

const CartItem = ({ item, onAdd, onDelete }: Props) => {
  const [qty, setQty] = useState(item.quantity);

  const removeHandler = async () => {
    const deletedId = await deleteCart(item.id);
    onDelete(deletedId);
    setQty((prev) => prev - 1);
  };

  const addHandler = async () => {
    const addedDevice = await postCart(item.id);
    onAdd(addedDevice);
    setQty((prev) => prev + 1);
  };

  return (
    <article className={cx(classes.item, 'mb-2')}>
      <div className={classes.image}>
        <img
          src={process.env.REACT_APP_HOST_URL + '/' + item.img}
          alt={item.name}
          width={100}
          height={100}
        />
      </div>
      <h4 className={classes.name}>
        {item.type} {item.brand} {item.name}
      </h4>
      <div className={classes.controls}>
        <Button onClick={removeHandler} disabled={qty === 0}>
          -
        </Button>
        <span>{qty}</span>
        <Button onClick={addHandler}>+</Button>
      </div>
      <div>{item.price * item.quantity} руб.</div>
    </article>
  );
};

export default CartItem;
