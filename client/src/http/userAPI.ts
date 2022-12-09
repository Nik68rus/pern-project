import { host, authHost } from '.';
import decode from 'jwt-decode';
import { JWTUser } from '../types/user';

interface CreateUserResponse {
  message: string;
  payload: string;
}

export const registration = async (email: string, password: string) => {
  const { data } = await host.post<CreateUserResponse>('/user/signup', {
    email,
    password,
    role: 'ADMIN',
  });

  localStorage.setItem('token', data.payload);

  return decode<JWTUser>(data.payload);
};

export const login = async (email: string, password: string) => {
  const { data } = await host.post<CreateUserResponse>('/user/login', {
    email,
    password,
    role: 'ADMIN',
  });

  localStorage.setItem('token', data.payload);

  return decode<JWTUser>(data.payload);
};

export const check = async () => {
  const { data } = await authHost.get<CreateUserResponse>('/user/auth');
  localStorage.setItem('token', data.payload);
  return decode<JWTUser>(data.payload);
};
