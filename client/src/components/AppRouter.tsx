import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import DevicePage from '../pages/DevicePage';
import Shop from '../pages/Shop';
import { RoutePath } from '../types/routes';
import PrivateRoute from './PrivateRoute';
// import { publicRoutes, protectedRoutes } from '../routes';
// import { Route } from '../types/routes';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path={RoutePath.ADMIN} element={<PrivateRoute />}>
          <Route path={RoutePath.ADMIN} element={<Admin />} />
        </Route>
        <Route path={RoutePath.CART} element={<PrivateRoute />}>
          <Route path={RoutePath.CART} element={<Cart />} />
        </Route>
        <Route path={RoutePath.HOME} element={<Shop />} />
        <Route path={RoutePath.LOGIN} element={<Auth />} />
        <Route path={RoutePath.SIGNUP} element={<Auth />} />
        <Route path={RoutePath.DEVICE} element={<DevicePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
