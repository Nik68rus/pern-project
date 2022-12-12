import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { RoutePath } from '../types/routes';
import classes from './Header.module.scss';

const Header = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink className={classes.logo} to={RoutePath.HOME}>
          ДЕВАЙС
        </NavLink>
        {user.isAuth ? (
          <Nav className={`ml-auto ${classes.nav}`}>
            {user.user && user.user.role === 'ADMIN' && (
              <Button
                variant="outline-light"
                onClick={() => {
                  navigate(RoutePath.ADMIN);
                }}
              >
                Админ панель
              </Button>
            )}
            <Button
              variant="outline-light"
              onClick={() => {
                navigate(RoutePath.CART);
              }}
            >
              Корзина
            </Button>
            <Button
              variant="outline-light"
              onClick={() => {
                user.setAuth(false);
                user.setUser(null);
                navigate(RoutePath.LOGIN);
                localStorage.removeItem('token');
              }}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className={`ml-auto ${classes.nav}`}>
            <Button
              variant="outline-light"
              onClick={() => navigate(RoutePath.LOGIN)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Header;
