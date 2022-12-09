import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { login, registration } from '../http/userAPI';
import { RoutePath } from '../types/routes';
import classes from './Auth.module.css';
import { AxiosError } from 'axios';

const Auth = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === RoutePath.LOGIN;
  const { user } = useContext(Context);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;
      const { email, password } = form;
      if (isLogin) {
        data = await login(email, password);
        console.log(data);

        if (data) {
          user.setAuth(true);
          user.setUser(data);
          navigate(RoutePath.HOME);
        }
      } else {
        data = await registration(email, password);
        if (data) {
          navigate(RoutePath.LOGIN);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data || 'Что-то пошло не так! Попробуйте позже!');
      } else if (error instanceof Error) {
        toast(error.message || 'Что-то пошло не так! Попробуйте позже!!');
      } else if (typeof error === 'string') {
        toast(error || 'Что-то пошло не так! Попробуйте позже!!!');
      } else {
        toast('Что-то пошло не так! Попробуйте позже!!!!');
      }
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  if (user.isAuth) {
    return <Navigate to={RoutePath.HOME} replace />;
  }

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form onSubmit={submitHandler}>
          <Form.Control
            className="mt-3"
            placeholder="Введите e-mail"
            name="email"
            onChange={inputChangeHandler}
            value={form.email}
          />
          <Form.Control
            className="mt-3"
            type="password"
            placeholder="Введите пароль"
            name="password"
            onChange={inputChangeHandler}
            value={form.password}
          />
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
            <Button variant="outline-success" type="submit">
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
