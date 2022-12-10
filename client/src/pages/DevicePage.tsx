import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IDevice } from '../types/device';
import classes from './DevicePage.module.scss';
import cx from 'classnames';
import { getOneDevice } from '../http/deviceAPI';

function DevicePage() {
  const params = useParams<{
    deviceId: string;
  }>();
  const [device, setDevice] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.deviceId) return;
    setLoading(true);
    getOneDevice(params.deviceId).then((data) => {
      setDevice(data);
      setLoading(false);
    });
  }, [params.deviceId]);

  if (loading || !device) {
    return <h4>Loading...</h4>;
  }

  return (
    <Container className="mt-3 d-flex flex-column">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_HOST_URL + '/' + device.img}
          />
        </Col>
        <Col md={4}>
          <div className={classes.rateWrapper}>
            <h2>{device.name}</h2>
            <div className={classes.rating}>
              <FaStar />
              {device.rating}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around p-4"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}
          >
            <h3>{device.price} Р</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      {device.info.length ? (
        <Row className={cx(classes.params, 'mt-3')}>
          <h2>Характеристики</h2>
          <ul>
            {device.info.map((item, index) => (
              <li
                key={item.id}
                className={index % 2 === 0 ? classes.dark : null}
              >
                {item.title}: {item.description}
              </li>
            ))}
          </ul>
        </Row>
      ) : null}
    </Container>
  );
}

export default DevicePage;
