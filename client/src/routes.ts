import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';
import { RoutePath } from './types/routes';

export const protectedRoutes = [
  {
    path: RoutePath.ADMIN,
    component: Admin,
  },
  {
    path: RoutePath.CART,
    component: Cart,
  },
];

export const publicRoutes = [
  {
    path: RoutePath.HOME,
    component: Shop,
  },
  {
    path: RoutePath.LOGIN,
    component: Auth,
  },
  {
    path: RoutePath.SIGNUP,
    component: Auth,
  },
  {
    path: RoutePath.DEVICE + '/:id',
    component: DevicePage,
  },
];
