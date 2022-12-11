import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../App';

function Reset() {
  const { device } = useContext(Context);

  const clickHandler = () => {
    device.setSelectedBrand(null);
    device.setSelectedType(null);
    device.setPage(1);
  };
  return (
    <Button onClick={clickHandler} className="mt-5">
      Сбросить фильтры
    </Button>
  );
}

export default Reset;
