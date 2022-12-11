import { makeAutoObservable } from 'mobx';
import { JWTUser } from '../types/user';

export interface User {
  // name: string;
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
}
export class UserStore {
  isAuth: boolean;
  user: JWTUser | null;

  constructor() {
    this.isAuth = false;
    this.user = null;
    makeAutoObservable(this);
  }

  setAuth(status: boolean) {
    this.isAuth = status;
  }

  setUser(user: JWTUser | null) {
    this.user = user;
  }
}

export default new UserStore();
