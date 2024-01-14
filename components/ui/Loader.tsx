import React from 'react'
import { Spinner,Flex } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      w={'100vw'}
      h={'100vh'}
      pos={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
      <Spinner />
    </Flex>
  );
}

export default Loader