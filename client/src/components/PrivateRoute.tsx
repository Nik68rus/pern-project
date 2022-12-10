import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../App';
import { handleError } from '../helpers';
import { RoutePath } from '../types/routes';

interface Props {
  access?: string;
}

function PrivateRoute({ access }: Props) {
  const { user } = useContext(Context);
  const loggedIn = user.isAuth;

  if (!loggedIn) {
    handleError('Необходимо авторизоваться!', 'notauth');
    return <Navigate to={RoutePath.LOGIN} />;
  } else if (!access) {
    return <Outlet />;
  } else if (access === 'admin' && user.user && user.user.role === 'ADMIN') {
    return <Outlet />;
  } else {
    handleError('Не достаточно прав!');
    return <Navigate to={RoutePath.HOME} />;
  }
}

export default PrivateRoute;
