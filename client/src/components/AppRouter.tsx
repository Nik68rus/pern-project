import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { publicRoutes, protectedRoutes } from '../routes';

function AppRouter() {
  const isAuth = false;
  return (
    <Router>
      <Routes>
        {isAuth &&
          protectedRoutes.map((route) => (
            <Route path={route.path} element={route.component()} />
          ))}
        {publicRoutes.map((route) => (
          <Route path={route.path} element={route.component()} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
