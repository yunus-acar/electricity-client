import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const consumptionList = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.get('/consumption/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
