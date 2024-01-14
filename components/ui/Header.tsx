import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Breadcrumbs from './Breadcrumbs';

interface Props {
  title: string;
  breadcrumbItems: Array<{
    label: string;
    href: string;
  }>;
}
const Header = ({ title, breadcrumbItems }: Props) => {
  return (
    <Flex height={65} backgroundColor="#ffffff" justifyContent="space-between" alignItems="center" px={2} my={2}>
      <Heading size="lg">{title}</Heading>
      <Box display="flex">
        <Breadcrumbs items={breadcrumbItems} />
      </Box>
    </Flex>
  );
};

export default Header;
