import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const signUp = async (data: { email: string; password: string; companyName: string }) => {
  try {
    const response = await api.post('/user/signUp', data);
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
