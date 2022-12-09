import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Context } from '../App';
import { RoutePath } from '../types/routes';
import classes from './Header.module.css';

const Header = observer(() => {
  const { user } = useContext(Context);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink className={classes.logo} to={RoutePath.HOME}>
          ДЕВАЙС
        </NavLink>
        {user.isAuth ? (
          <Nav className={`ml-auto ${classes.nav}`}>
            <Button variant="outline-light">Админ панель</Button>
            <Button variant="outline-light" className={classes.exit}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className={`ml-auto ${classes.nav}`}>
            <Button variant="outline-light" onClick={() => user.setAuth(true)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default Header;
