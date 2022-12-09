// import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { Context } from '../App';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import DevicePage from '../pages/DevicePage';
import Shop from '../pages/Shop';
import { RoutePath } from '../types/routes';
import PrivateRoute from './PrivateRoute';

function AppRouter() {
  return (
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
      <Route path={RoutePath.DEVICE} element={<Shop />} />
      <Route path={RoutePath.DEVICE + '/:deviceId'} element={<DevicePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
