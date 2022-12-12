import React, { useContext } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { IDevice } from '../types/device';
import { FaStar } from 'react-icons/fa';
import classes from './DeviceItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types/routes';
import { Context } from '../App';

interface Props {
  device: IDevice;
}

const DeviceItem = ({ device }: Props) => {
  const deviceCtx = useContext(Context).device;
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => {
        navigate(`${RoutePath.DEVICE}/${device.id}`);
      }}
    >
      <Card
        style={{ width: 150, cursor: 'pointer' }}
        border="light"
        className={classes.card}
      >
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_HOST_URL + '/' + device.img}
          className={classes.image}
        />
        <div className="mt-1 d-flex justify-content-between">
          <div className="text-black-50">
            {
              deviceCtx.brands.find((brand) => brand.id === device.brandId)
                ?.name
            }
          </div>
          <div className={classes.rating}>
            <div>{device.rating === 0 ? 'n/a' : device.rating}</div>
            <FaStar />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
