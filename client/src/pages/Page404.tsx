import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutePath } from '../types/routes';

const Page404 = () => {
  return (
    <Container>
      <h1>404</h1>
      <h2>Ничего не найдено! Попробуйте сначала!</h2>
      <Link to={RoutePath.HOME}>На главную</Link>
    </Container>
  );
};

export default Page404;
