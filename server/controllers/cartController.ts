import { ExtendedRequest } from './../types/index';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Cart, CartDevice } from '../models/models';

interface CartRequest extends ExtendedRequest {
  body: {
    deviceId: number;
  };
}

class CartController {
  async getCart(req: Request, res: Response) {}

  async postCart(req: CartRequest, res: Response, next: NextFunction) {
    const userId = req.user?.id;
    const { deviceId } = req.body;

    if (!userId) {
      return next(ApiError.unauthenticated('Необходимо залогиниться!'));
    }

    if (!deviceId) {
      return next(ApiError.badRequest('Не указан id устройства!'));
    }

    try {
      let cart = await Cart.findOne({ where: { userId } });

      if (!cart) {
        cart = await Cart.create({ userId });
      }
      const cartItem = await CartDevice.create({ cartId: cart.id, deviceId });
      res
        .status(201)
        .json({ message: 'Device added to cart', payload: cartItem });
    } catch (error) {
      return next(ApiError.internal('Что-то пошло не так!'));
    }
  }
}

export default new CartController();
