import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../error/apiError';
import { UserRole } from '../types';

interface JWTUser {
  id: number;
  email: string;
  role: UserRole;
  iat: Date;
  exp: Date;
}

interface ExtendedRequest extends Request {
  user?: JWTUser;
}

export default function (role: UserRole) {
  return function (req: ExtendedRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(ApiError.unauthenticated('Не достаточно прав доступа!'));
      }

      let decoded: JWTUser;

      try {
        decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as unknown as JWTUser;
        if (decoded.role !== role) {
          return next(ApiError.forbiden('Не достаточно прав доступа!'));
        }
      } catch (err) {
        return next(ApiError.internal('Что-то пошло не так!'));
      }
      req.user = decoded;
      next();
    } catch (error) {}
  };
}
