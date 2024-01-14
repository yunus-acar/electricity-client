import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const refresh = async (data: { refresh: string }) => {
  try {
    const response = await api.post('/user/refresh', data);
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
