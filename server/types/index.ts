import { Request } from 'express';

interface JWTUser {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
  iat: Date;
  exp: Date;
}

export interface ExtendedRequest extends Request {
  user?: JWTUser;
}
