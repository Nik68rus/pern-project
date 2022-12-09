import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
import { IDevice } from '../types/device';
import classes from './DevicePage.module.scss';
import cx from 'classnames';

function DevicePage() {
  // const params = useParams<{
  //   deviceId: string;
  // }>();

  const device: IDevice = {
    id: 3,
    name: 'Iphone 13 pro max',
    price: 1299,
    rating: 5,
    img: 'https://yablonya.com/wp-content/uploads/2022/04/samsung-galaxy-s21-ultra-7-768x768.jpg',
    typeId: 2,
    brandId: 1,
  };

  const description = [
    { id: 1, title: 'Оперативная память', description: '5 гб' },
    { id: 2, title: 'Камера', description: '12 мп' },
    { id: 3, title: 'Процессор', description: 'M1 Pro' },
    { id: 4, title: 'Вес', description: '215 г.' },
    { id: 5, title: 'Аккумулятор', description: '10000 MAh' },
  ];

  return (
    <Container className="mt-3 d-flex flex-column">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
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
      <Row className={cx(classes.params, 'mt-3')}>
        <h2>Характеристики</h2>
        <ul>
          {description.map((item, index) => (
            <li key={item.id} className={index % 2 === 0 ? classes.dark : null}>
              {item.title}: {item.description}
            </li>
          ))}
        </ul>
      </Row>
    </Container>
  );
}

export default DevicePage;
