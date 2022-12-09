import { makeAutoObservable } from 'mobx';

export interface User {
  name: string;
}

export class UserStore {
  isAuth: boolean;
  user: User;

  constructor() {
    this.isAuth = false;
    this.user = { name: 'Nik' };
    makeAutoObservable(this);
  }

  setAuth(status: boolean) {
    this.isAuth = status;
  }

  setUser(user: User) {
    this.user = user;
  }
}

export default new UserStore();
