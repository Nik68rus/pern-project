import { useState, useEffect, useContext } from 'react';
import { Button, Card, Container, Image, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IDevice } from '../types/device';
import classes from './DevicePage.module.scss';
import cx from 'classnames';
import { getOneDevice } from '../http/deviceAPI';
import Rating from '../components/Rating';
import { observer } from 'mobx-react-lite';
import { Context } from '../App';
import { handleError } from '../helpers';
import { RoutePath } from '../types/routes';
import { postCart } from '../http/cartAPI';
import { toast } from 'react-toastify';

const DevicePage = observer(() => {
  const params = useParams<{
    deviceId: string;
  }>();
  const [device, setDevice] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const { user, device: deviceCtx } = useContext(Context);

  useEffect(() => {
    if (!params.deviceId) return;

    if (isNaN(+params.deviceId)) {
      return navigate(RoutePath.NOTFOUND);
    }

    setLoading(true);
    getOneDevice(params.deviceId)
      .then((data) => {
        setDevice(data);
        deviceCtx.setSelectedDevice(data.id);
        setRating(data.rating);
      })
      .catch((err) => handleError(err, 'nodevice'))
      .finally(() => setLoading(false));
  }, [params.deviceId, navigate, deviceCtx]);

  const handleCartAdd = async () => {
    if (deviceCtx.selectedDevice) {
      await postCart(deviceCtx.selectedDevice);
      toast.success('Товар добавлен в корзину!');
    }
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!device) {
    return <Navigate to={RoutePath.NOTFOUND} />;
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
              {rating === 0 ? 'N/A' : rating}
            </div>
          </div>
          {user.user ? <Rating onChange={setRating} /> : null}
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
            <Button variant="outline-dark" onClick={handleCartAdd}>
              Добавить в корзину
            </Button>
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
