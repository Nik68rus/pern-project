import { createContext, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import userStore from './store/UserStore';
import deviceStore from './store/DeviceStore';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { check } from './http/userAPI';
import { observer } from 'mobx-react-lite';

interface IContext {
  user: typeof userStore;
  device: typeof deviceStore;
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
    page: 0,
    limit: 0,
    totalCount: 0,
    setTypes: () => {},
    setBrands: () => {},
    setDevices: () => {},
    setSelectedType: () => {},
    setSelectedBrand: () => {},
    setPage: () => {},
    setLimit: () => {},
    setTotalCount: () => {},
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
      }}
    >
      <Router>
        <Header />
        <AppRouter />
        <ToastContainer />
      </Router>
    </Context.Provider>
  );
});

export default App;
