import api from '@/utils/axios';
import errorFormatter from '@/utils/errorFormatter';

export const logOut = async (data: { refreshToken: string }) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.post(
      '/user/signOut',
      {
        refresh: data.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw errorFormatter(error);
  }
};
