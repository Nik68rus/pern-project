import React from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '../types/routes';
import classes from './Auth.module.css';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === RoutePath.LOGIN;

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form>
          <Form.Control className="mt-3" placeholder="Введите e-mail" />
          <Form.Control className="mt-3" placeholder="Введите пароль" />
          <div className={classes.actions}>
            {isLogin ? (
              <div>
                Нет аккаунта?{' '}
                <NavLink to={RoutePath.SIGNUP}>Зарегистрироваться</NavLink>
              </div>
            ) : (
              <div>
                Уже зарегистрирован?{' '}
                <NavLink to={RoutePath.LOGIN}>Войти</NavLink>
              </div>
            )}
            <Button variant="outline-success">
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Auth;
