import { ICartDevice } from './../types/device';
import { makeAutoObservable } from 'mobx';

export class CartStore {
  cart: ICartDevice[];

  constructor() {
    this.cart = [];
    makeAutoObservable(this);
  }

  setCart(items: ICartDevice[]) {
    this.cart = items;
  }
}

export default new CartStore();
