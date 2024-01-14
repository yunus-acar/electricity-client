'use client';

import { logOut } from '@/api/auth/logout.api';
import { useUserStore } from '@/stores/user.store';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useMutation } from 'react-query';
import AddIndex from '../AddIndex';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  link: string;
}

const Links = [
  { name: 'Dashboard', link: '/dashboard' },
  { name: 'Indexes', link: '/dashboard/indexes' },
  { name: 'Consumptions', link: '/dashboard/consumptions' },
];
const NavLink = (props: Props) => {
  const { name, link } = props;
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.200',
      }}
      href={link}
    >
      {name}
    </Box>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync } = useMutation(logOut);
  const { refreshToken, logout } = useUserStore();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await mutateAsync({
        refreshToken: refreshToken as string,
      });
      logout();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg={'gray.100'} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <IoClose /> : <GiHamburgerMenu />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Electricity Project</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink {...link} key={link.name} />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <AddIndex />
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar size={'sm'} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
