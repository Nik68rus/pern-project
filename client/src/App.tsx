import { createContext, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import userStore from './store/UserStore';
import deviceStore from './store/DeviceStore';
import cartStore from './store/CartStore';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { check } from './http/userAPI';
import { observer } from 'mobx-react-lite';

interface IContext {
  user: typeof userStore;
  device: typeof deviceStore;
  cart: typeof cartStore;
}

const initialState: IContext = {
  user: {
    isAuth: false,
    user: null,
    setAuth: () => {},
    setUser: () => {},
  },
  device: {
    types: [],
    brands: [],
    devices: [],
    selectedType: null,
    selectedBrand: null,
    selectedDevice: null,
    page: 0,
    limit: 0,
    totalCount: 0,
    setTypes: () => {},
    setBrands: () => {},
    setDevices: () => {},
    setSelectedType: () => {},
    setSelectedBrand: () => {},
    setSelectedDevice: () => {},
    setPage: () => {},
    setLimit: () => {},
    setTotalCount: () => {},
  },
  cart: {
    items: [],
    setItems: () => {},
  },
};

export const Context = createContext<IContext>(initialState);

const App = observer(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        userStore.setUser(data);
        userStore.setAuth(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Context.Provider
      value={{
        user: userStore,
        device: deviceStore,
        cart: cartStore,
      }}
    >
      <Router>
        <Header />
        <AppRouter />
        <ToastContainer position="bottom-right" />
      </Router>
    </Context.Provider>
  );
});

export default App;
