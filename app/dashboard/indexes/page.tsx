'use client';
import { indexList } from '@/api/index/list.api';
import Header from '@/components/ui/Header';
import { useModalStore } from '@/stores/modal.store';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Table, Thead, Box, IconButton, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { deleteIndex } from '@/api/index/delete.api';
import { toast } from 'sonner';
import Loader from '@/components/ui/Loader';
import { Index } from '@/interfaces/electricityIndex.interface';
import dayjs from 'dayjs';
import { TbTrash } from 'react-icons/tb';

const Indexes = () => {
  const { data, isLoading, refetch } = useQuery('indexes', indexList);
  const { show } = useModalStore();
  const { mutateAsync } = useMutation(deleteIndex);

  useEffect(() => {
    refetch();
  }, [refetch, show]);

  const handleDelete = async (id: string) => {
    try {
      await mutateAsync(id);
      refetch();
      toast.success('Index deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting index');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Header title="Indexes" breadcrumbItems={[{ label: 'Indexes', href: '/indexes' }]} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Index</Th>
              <Th>Index Date</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((index: Index, indexKey: number) => (
              <Tr key={indexKey}>
                <Td>{indexKey + 1}</Td>
                <Td>{index.value}</Td>
                <Td>{dayjs(index.date).format('YYYY-MM-DD')}</Td>
                <Td isNumeric>
                  <IconButton
                    colorScheme="red"
                    aria-label="delete"
                    icon={<TbTrash />}
                    onClick={() => handleDelete(index.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Indexes;
