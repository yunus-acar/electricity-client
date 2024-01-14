import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const addIndex = async (data: { value: number; date: string }) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.post('/electricityIndex/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
