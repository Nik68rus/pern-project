import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../App';
import { RoutePath } from '../types/routes';

function PrivateRoute() {
  const { user } = useContext(Context);
  const loggedIn = user.isAuth;

  return loggedIn ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
}

export default PrivateRoute;
