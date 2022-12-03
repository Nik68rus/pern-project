import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { Type } from '../models/models';

interface ExtendedRequest extends Request {
  body: {
    name: string;
  };
}

class TypeController {
  async getTypes(req: Request, res: Response) {
    const types = await Type.findAll();
    return res.status(200).json({ message: 'Success!', types });
  }

  async postType(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name) {
      return next(ApiError.badRequest('No type name provided!'));
    }

    const type = await Type.create({ name });
    return res.status(201).json({ message: 'Type creation success!', type });
  }
}

export default new TypeController();
