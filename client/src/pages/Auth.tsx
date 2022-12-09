import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { Context } from '../App';
import { RoutePath } from '../types/routes';
import classes from './Auth.module.css';

const Auth = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === RoutePath.LOGIN;
  const { user } = useContext(Context);

  if (user.isAuth) {
    return <Navigate to={RoutePath.HOME} replace />;
  }

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
});

export default Auth;
