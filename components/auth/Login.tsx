'use client';
import { signIn } from '@/api/auth/signIn.api';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync, isLoading } = useMutation(signIn);
  const { setTokens } = useUserStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      return toast.error('Please enter a valid email address');
    }

    try {
      const result = await mutateAsync({ email, password });
      if (result) {
        console.log('🌵💜🐢', result);

        setTokens(result.access, result.refresh);
        toast.success(result.message);
        router.push('/dashboard');
        // window.location.reload();
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormControl>
      <Stack spacing={10}>
        <Button
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
          onClick={handleLogin}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Sign in
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
