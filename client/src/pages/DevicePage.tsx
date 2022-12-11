import { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IDevice } from '../types/device';
import classes from './DevicePage.module.scss';
import cx from 'classnames';
import { getOneDevice } from '../http/deviceAPI';
import Rating from '../components/Rating';
import { observer } from 'mobx-react-lite';
import { Context } from '../App';

const DevicePage = observer(() => {
  const params = useParams<{
    deviceId: string;
  }>();
  const [device, setDevice] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(Context);

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
      <div className={classes.pageRow}>
        <div className={classes.column}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_HOST_URL + '/' + device.img}
            className={classes.image}
          />
        </div>
        <div className={classes.column}>
          <div className={classes.rateWrapper}>
            <h2>{device.name}</h2>
            <div className={classes.rating}>
              <FaStar />
              {device.rating}
            </div>
          </div>
          {user.user ? <Rating /> : null}
        </div>
        <div className={classes.column}>
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
        </div>
      </div>
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
});

export default DevicePage;
