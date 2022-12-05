import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';
import { Route } from './types/routes';

export const protectedRoutes = [
  {
    path: Route.ADMIN,
    component: Admin,
  },
  {
    path: Route.DEVICE,
    component: Cart,
  },
];

export const publicRoutes = [
  {
    path: Route.HOME,
    component: Shop,
  },
  {
    path: Route.LOGIN,
    component: Auth,
  },
  {
    path: Route.SIGNUP,
    component: Auth,
  },
  {
    path: Route.DEVICE,
    component: DevicePage,
  },
];
