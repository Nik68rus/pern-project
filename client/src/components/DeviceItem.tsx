import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { IDevice } from '../types/device';
import { FaStar } from 'react-icons/fa';
import classes from './DeviceItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types/routes';

interface Props {
  device: IDevice;
}

const DeviceItem = ({ device }: Props) => {
  const navigate = useNavigate();
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => {
        navigate(`${RoutePath.DEVICE}/${device.id}`);
      }}
    >
      <Card style={{ width: 150, cursor: 'pointer' }} border="light">
        <Image width={150} height={150} src={device.img} />
        <div className="mt-1 d-flex justify-content-between">
          <div className="text-black-50">Apple</div>
          <div className={classes.rating}>
            <div>{device.rating}</div>
            <FaStar />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
