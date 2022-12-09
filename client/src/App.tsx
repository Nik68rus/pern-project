import React, { createContext } from 'react';
import AppRouter from './components/AppRouter';
import userStore from './store/UserStore';
import deviceStore from './store/DeviceStore';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
interface IContext {
  user: typeof userStore;
  device: typeof deviceStore;
}

const initialState: IContext = {
  user: {
    isAuth: false,
    user: { name: '' },
    setAuth: () => {},
    setUser: () => {},
  },
  device: {
    types: [],
    brands: [],
    devices: [],
    selectedType: null,
    selectedBrand: null,
    setTypes: () => {},
    setBrands: () => {},
    setDevices: () => {},
    setSelectedType: () => {},
    setSelectedBrand: () => {},
  },
};

export const Context = createContext<IContext>(initialState);

function App() {
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
      </Router>
    </Context.Provider>
  );
}

export default App;
