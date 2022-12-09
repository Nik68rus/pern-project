import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    toast(error.response?.data || 'Что-то пошло не так! Попробуйте позже!');
  } else if (error instanceof Error) {
    toast(error.message || 'Что-то пошло не так! Попробуйте позже!!');
  } else if (typeof error === 'string') {
    toast(error || 'Что-то пошло не так! Попробуйте позже!!!');
  } else {
    toast('Что-то пошло не так! Попробуйте позже!!!!');
  }
};
