'use client';

import {
  Flex,
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { accessToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard');
    }
  }, [accessToken, router]);

  return (
    <Flex minH={'100vh'} w="100%" align={'center'} justify={'center'} bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} alignItems={'center'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{tabIndex === 0 ? 'Sign in  to your account' : 'Sign up now'}</Heading>
        </Stack>
        <Box w={'lg'} mx="auto" rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Sign In</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp setTabIndex={setTabIndex} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth;
