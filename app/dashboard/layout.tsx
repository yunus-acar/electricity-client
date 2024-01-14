'use client';

import { logOut } from '@/api/auth/logout.api';
import { refresh } from '@/api/auth/refresh.api';
import Navbar from '@/components/ui/Navbar';
import { useUserStore } from '@/stores/user.store';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { accessToken, logout, setAccessToken, refreshToken } = useUserStore();
  const { mutateAsync } = useMutation(refresh);
  const router = useRouter();

  // const handleRefreshToken = async () => {
  //   try {
  //     const result = await mutateAsync({
  //       refresh: refreshToken as string,
  //     });
  //     if (result) {
  //       setAccessToken(result.access);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     logout();
  //     await logOut({
  //       refreshToken: refreshToken as string,
  //     });
  //     router.push('/');
  //   }
  // };

  // useEffect(() => {
  //   if (refreshToken) {
  //     handleRefreshToken();
  //   }
  // }, []);

  useEffect(() => {
    if (!accessToken) {
      router.push('/');
    }
  }, [accessToken, router]);

  return (
    <>
      <Navbar />
      <Container mx={'auto'} maxW={'container.xl'}>
        {children}
      </Container>
    </>
  );
}
