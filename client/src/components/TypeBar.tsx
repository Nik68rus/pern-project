import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Context } from '../App';
// import { Link } from 'react-router-dom';
// import { RoutePath } from '../types/routes';
import classes from './TypeBar.module.scss';
import cx from 'classnames';
import { deleteType } from '../http/deviceAPI';
import { toast } from 'react-toastify';
import { handleError } from '../helpers';

const TypeBar = observer(() => {
  const { device, user } = useContext(Context);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteType(id);
      toast.success(response);
      device.setTypes(device.types.filter((t) => t.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ListGroup className={cx('mt-3', classes.list)}>
      {device.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          onClick={() => {
            device.setSelectedType(type.id);
            device.setPage(1);
          }}
          active={device.selectedType === type.id}
          className={classes.item}
        >
          {type.name}
          {user.user?.role === 'ADMIN' && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(type.id);
              }}
            >
              Х
            </Button>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
