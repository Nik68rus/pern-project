import { toast, Id } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleError = (error: any, id?: Id) => {
  if (!id) {
    id = new Date().toISOString();
  }
  if (!toast.isActive(id)) {
    if (error instanceof AxiosError) {
      toast(error.response?.data || 'Что-то пошло не так! Попробуйте позже!', {
        toastId: id,
      });
    } else if (error instanceof Error) {
      toast(error.message || 'Что-то пошло не так! Попробуйте позже!!', {
        toastId: id,
      });
    } else if (typeof error === 'string') {
      toast(error || 'Что-то пошло не так! Попробуйте позже!!!', {
        toastId: id,
      });
    } else {
      toast('Что-то пошло не так! Попробуйте позже!!!!', { toastId: id });
    }
  }
};
