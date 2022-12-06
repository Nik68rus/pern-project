import { makeAutoObservable } from 'mobx';

interface User {
  name: string;
}

export default class UserStore {
  private _isAuth: boolean;
  private _user: User;
  constructor() {
    this._isAuth = false;
    this._user = { name: '' };
    makeAutoObservable(this);
  }
}
