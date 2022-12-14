import { ICartPosition } from './../../client/src/types/device';
import { ExtendedRequest } from './../types/index';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Cart, CartDevice, Order, OrderDevice } from '../models/models';

interface OrderRequest extends ExtendedRequest {
  body: {
    details: string;
    items: ICartPosition[];
  };
}

class OrderController {
  async getAllOrders(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const orders = await Order.findAll();
      res.status(200).json({ message: 'ok', payload: orders });
    } catch (error) {
      next(ApiError.internal('Что-то пошло не так'));
    }
  }

  async getOneOrder(req: ExtendedRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(
        ApiError.unauthenticated(
          'Функционал доступен авторизованным пользователям!'
        )
      );
    }

    const userId = req.user.id;
    const { orderId } = req.params;

    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        return next(ApiError.notFound('Заказ не найден!'));
      }

      if (userId !== order.id) {
        return next(ApiError.forbiden('Нет доступа!'));
      }

      const items = await OrderDevice.findAll({ where: { orderId: order.id } });

      if (!items.length) {
        return next(ApiError.notFound('Товары не найдены!'));
      }

      return res.status(200).json({ messge: 'Ok', payload: { order, items } });
    } catch (error) {
      next(ApiError.internal('Что-то пошло не так'));
    }
  }

  async postOrder(req: OrderRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(
        ApiError.unauthenticated(
          'Функционал доступен авторизованным пользователям!'
        )
      );
    }

    const { id } = req.user;
    const { details, items } = req.body;

    if (details.trim().length < 5) {
      return next(
        ApiError.validation(
          'Заполните дополнительную информацию корректно(мин. 5 символов)!'
        )
      );
    }

    if (!items.length) {
      return next(ApiError.validation('Добавьте в заказ хотя бы один товар!'));
    }

    try {
      const order = await Order.create({
        userId: id,
        details,
        status: 'processing',
      });

      items.forEach(async (item) => {
        await OrderDevice.create({
          orderId: order.id,
          deviceId: item.id,
          price: item.price,
          quantity: item.quantity,
        });
      });

      const cart = await Cart.findOne({ where: { userId: id } });

      if (!cart) {
        return next(ApiError.notFound('Корзина не найдена!'));
      }

      const cartItems = await CartDevice.findAll({
        where: { cartId: cart.id },
      });

      cartItems.forEach((item) => item.destroy());

      return res.status(200).json({ message: 'ok', payload: order });
    } catch (error) {
      next(ApiError.internal('Что-то пошло не так'));
    }
  }
}

export default new OrderController();
