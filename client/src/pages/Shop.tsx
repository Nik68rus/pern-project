import { observer } from 'mobx-react-lite';
import { useState, useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../App';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import Reset from '../components/Reset';
import TypeBar from '../components/TypeBar';
import { handleError } from '../helpers';
import {
  getBrands,
  getDevices,
  getTypes,
  IGetDeviceParams,
} from '../http/deviceAPI';

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    device.setSelectedDevice(null);
    getBrands()
      .then((brands) => {
        device.setBrands(brands);
        return getTypes();
      })
      .then((types) => device.setTypes(types))
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
    let params: IGetDeviceParams = {
      page: device.page,
      limit: device.limit,
    };
    if (device.selectedBrand) {
      params.brandId = device.selectedBrand;
    }
    if (device.selectedType) {
      params.typeId = device.selectedType;
    }

    getDevices(params).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device, device.selectedBrand, device.selectedType, device.page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
          <Reset />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
