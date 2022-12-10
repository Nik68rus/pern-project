import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../App';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  if (!device.devices.length) {
    return <h3 className="mt-3">Ничего не найдено!</h3>;
  }

  return (
    <Row className="d-flex mt-3">
      {device.devices.map((dev) => (
        <DeviceItem key={dev.id} device={dev} />
      ))}
    </Row>
  );
});

export default DeviceList;
