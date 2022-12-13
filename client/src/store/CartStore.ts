import { ICartDevice } from './../types/device';
import { makeAutoObservable } from 'mobx';

export class CartStore {
  items: ICartDevice[];

  constructor() {
    this.items = [];
    makeAutoObservable(this);
  }

  setItems(items: ICartDevice[]) {
    this.items = items;
  }
}

export default new CartStore();
