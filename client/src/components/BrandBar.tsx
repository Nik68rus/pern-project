import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Context } from '../App';
import classes from './BrandBar.module.scss';
import cx from 'classnames';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className={classes.wrapper}>
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          onClick={() => {
            device.setSelectedBrand(brand.id);
            device.setPage(1);
          }}
          className={cx(
            {
              [classes.active]: brand.id === device.selectedBrand,
            },
            'p-3',
            classes.brand
          )}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
