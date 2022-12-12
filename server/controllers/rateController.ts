import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Device, Rating, Type } from '../models/models';
import { ExtendedRequest } from '../types';

interface RateRequest extends ExtendedRequest {
  body: {
    rate: number;
  };
}

class RateController {
  async getTotalRate(req: Request, res: Response, next: NextFunction) {
    const { deviceId } = req.params;

    if (!deviceId || isNaN(+deviceId)) {
      return next(ApiError.internal('Неверное id устройства пользователя!'));
    }

    try {
      const device = await Device.findByPk(deviceId);
      if (device) {
        return res.status(200).json({ mwssage: 'ok', payload: device.rating });
      } else {
        return next(ApiError.notFound('Устройство не найдено!'));
      }
    } catch (error) {
      return next(ApiError.internal('Что-то пошло не так!'));
    }
  }

  async getPersonalRate(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { deviceId } = req.params;
    const user = req.user?.id;

    if (!deviceId || isNaN(+deviceId) || !user) {
      return next(
        ApiError.internal('Неверное id устройства или пользователя!')
      );
    }

    try {
      const rating = await Rating.findOne({
        where: { userId: user, deviceId },
      });
      return res
        .status(200)
        .json({ message: 'ok', payload: rating ? rating.rate : 0 });
    } catch (error) {
      ApiError.notFound('Что-то пошло не так при поиске рейтинга!');
    }
  }

  async postRate(req: RateRequest, res: Response, next: NextFunction) {
    const { deviceId } = req.params;
    const { rate } = req.body;
    const user = req.user?.id;

    if (!user) {
      return next(ApiError.unauthenticated('Необходимо залогиниться!'));
    }

    try {
      const currentRate = await Rating.findOne({
        where: { deviceId, userId: user },
      });

      if (currentRate) {
        currentRate.rate = rate;
        await currentRate.save();
      } else {
        await Rating.create({
          userId: user,
          deviceId: +deviceId,
          rate,
        });
      }

      const rates = await Rating.findAndCountAll({ where: { deviceId } });
      const rating = (
        rates.rows.reduce((acc, r) => acc + r.rate, 0) / rates.count
      ).toFixed(2);

      const device = await Device.findByPk(deviceId);

      if (device) {
        device.rating = +rating;
        await device.save();
        return res.status(210).json({ message: 'ok', payload: device });
      } else {
        return next(ApiError.notFound('Устройство не найдено!'));
      }
    } catch (err) {
      console.log(err);

      return next(ApiError.internal('Что-то пошло не так!'));
    }
  }
}

export default new RateController();
