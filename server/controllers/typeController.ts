import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Device, Type } from '../models/models';

interface ExtendedRequest extends Request {
  body: {
    name: string;
  };
}

class TypeController {
  async getTypes(req: Request, res: Response) {
    const types = await Type.findAll();
    return res.status(200).json({ message: 'Success!', payload: types });
  }

  async postType(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name) {
      return next(ApiError.badRequest('No type name provided!'));
    }

    const existingType = await Type.findOne({ where: { name } });

    if (existingType) {
      return next(ApiError.badRequest('Такой тип уже существует!'));
    }

    const type = await Type.create({ name });
    return res
      .status(201)
      .json({ message: 'Type creation success!', payload: type });
  }

  async deleteType(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) return;
    const devices = await Device.findAll({ where: { typeId: id } });

    if (devices.length) {
      return next(
        ApiError.badRequest('Сначала удалите все устройства данного типа!')
      );
    }

    const type = await Type.findByPk(id);

    if (type) {
      await type.destroy();
      return res.status(200).json({ message: 'Тип удален успешно!' });
    } else {
      return next(ApiError.badRequest('Не удалось найти тип!'));
    }
  }

  async editType(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) return;

    if (!name || name.trim().length < 2) {
      return next(
        ApiError.validation('Недопустимое значение (не менее двух символов)!')
      );
    }

    const type = await Type.findByPk(id);

    if (type) {
      type.name = name;
      await type.save();
      return res.status(200).json({ message: 'Тип обновлен!' });
    } else {
      return next(ApiError.badRequest('Не удалось найти тип!'));
    }
  }
}

export default new TypeController();
