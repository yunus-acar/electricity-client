import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/user/signIn', data);
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
