import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const deleteIndex = async (id: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.delete(`/electricityIndex/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
