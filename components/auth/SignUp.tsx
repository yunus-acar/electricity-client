'use client';

import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import { toast } from 'sonner';

import { signUp } from '@/api/auth/signUp.api';

const SignUp = ({ setTabIndex }: { setTabIndex: (index: number) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  const { mutateAsync, isLoading } = useMutation(signUp);

  const handleRegister = async () => {
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      return toast.error('Please enter a valid email address');
    }
    if (!companyName) {
      return toast.error('Please enter a company name');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    try {
      const result = await mutateAsync({ email, password, companyName });
      if (result) {
        toast.success(result.message);
        setTabIndex(0);
        setEmail('');
        setPassword('');
        setCompanyName('');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl id="companyName">
        <FormLabel>Company Name</FormLabel>
        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" />
      </FormControl>
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
          onClick={handleRegister}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Sign up
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignUp;
