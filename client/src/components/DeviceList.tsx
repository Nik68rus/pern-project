import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../App';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex mt-3">
      {device.devices.map((dev) => (
        <DeviceItem key={dev.id} device={dev} />
      ))}
    </Row>
  );
};

export default DeviceList;
