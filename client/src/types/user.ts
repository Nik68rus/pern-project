export type TUserRole = 'ADMIN' | 'USER';

export interface JWTUser {
  id: number;
  email: string;
  role: TUserRole;
  iat: Date;
  exp: Date;
}
