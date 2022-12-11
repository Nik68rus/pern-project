import { TUserRole } from './../types/user';
import { host, authHost } from '.';
import decode from 'jwt-decode';
import { JWTUser } from '../types/user';
import { User } from '../store/UserStore';

interface CreateUserResponse {
  message: string;
  payload: string;
}
interface GetUsersResponse {
  message: string;
  payload: User[];
}
interface UpdateUserResponse {
  message: string;
}

export const registration = async (email: string, password: string) => {
  const { data } = await host.post<CreateUserResponse>('/user/signup', {
    email,
    password,
    role: 'USER',
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

export const getAdmins = async () => {
  const { data } = await authHost.get<GetUsersResponse>('/user/admins');
  return data.payload;
};

export const updateUser = async (email: string, role: TUserRole) => {
  const { data } = await authHost.patch<UpdateUserResponse>('/user/:id', {
    email,
    role,
  });
  return data.message;
};
