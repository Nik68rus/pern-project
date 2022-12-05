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

export default function (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(ApiError.unauthenticated('Not authenticated!'));
    }

    let decoded: JWTUser;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as unknown as JWTUser;
    } catch (err) {
      return next(ApiError.unauthenticated('Not authenticated!'));
    }
    req.user = decoded;
    next();
  } catch (error) {}
}
