import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from '../App';
// import { Link } from 'react-router-dom';
// import { RoutePath } from '../types/routes';
import classes from './TypeBar.module.scss';
import cx from 'classnames';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup className={cx('mt-3', classes.list)}>
      {device.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          onClick={() => {
            device.setSelectedType(type.id);
          }}
          active={device.selectedType === type.id}
        >
          {type.name}
          {/* <Link to={`${RoutePath.DEVICE}?type=${type.id}`}>{type.name}</Link> */}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
