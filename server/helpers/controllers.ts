import { NextFunction } from 'express';
import ApiError from '../error/apiError';

export const handleError = (error: any, next: NextFunction) => {
  if (error instanceof Error) {
    next(ApiError.badRequest(error.message));
  } else {
    next(ApiError.internal('Something went wrong!'));
  }
};
