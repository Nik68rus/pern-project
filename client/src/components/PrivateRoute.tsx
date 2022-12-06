import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutePath } from '../types/routes';
// import useAuthStatus from '../hooks/useAuthStatus';
// import Spinner from './Spinner';

function PrivateRoute() {
  // const { loggedIn, checkingStatus } = useAuthStatus();

  // if (checkingStatus) {
  //   return <Spinner />;
  // }
  const loggedIn = false;

  return loggedIn ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
}

export default PrivateRoute;
