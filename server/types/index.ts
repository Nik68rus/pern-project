import { Request } from 'express';

export type UserRole = 'USER' | 'ADMIN';
interface JWTUser {
  id: number;
  email: string;
  role: UserRole;
  iat: Date;
  exp: Date;
}

export interface ExtendedRequest extends Request {
  user?: JWTUser;
}
