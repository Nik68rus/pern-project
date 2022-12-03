import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';

interface ExtendedRequest extends Request {
  query: {
    id?: string;
  };
}

class UserController {
  async signup(req: Request, res: Response) {}

  async login(req: Request, res: Response) {}

  async check(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { id } = req.query;

    if (!id) {
      return next(ApiError.badRequest('No ID in query!'));
    }
    console.log(id);

    res.status(200).json(req.query);
  }
}

export default new UserController();
