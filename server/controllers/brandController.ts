import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Brand } from '../models/models';

interface ExtendedRequest extends Request {
  body: {
    name: string;
  };
}

class BrandController {
  async getBrands(req: Request, res: Response) {
    const brands = await Brand.findAll();
    return res.status(200).json({ message: 'Success!', payload: brands });
  }

  async postBrand(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name) {
      return next(ApiError.badRequest('Не указано название бренда!'));
    }

    const existingBrand = await Brand.findOne({ where: { name } });

    if (existingBrand) {
      return next(ApiError.badRequest('Такой бренд уже существует!'));
    }

    const brand = await Brand.create({ name });
    return res
      .status(201)
      .json({ message: 'Brand creation success!', payload: brand });
  }
}

export default new BrandController();
