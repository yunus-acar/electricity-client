'use client';
import Header from '@/components/ui/Header';
import React from 'react';
import { useQuery } from 'react-query';
import { Table, Thead, Box, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import Loader from '@/components/ui/Loader';
import dayjs from 'dayjs';
import { consumptionList } from '@/api/consumption/list.api';
import { Consumption } from '@/interfaces/consumption.interface';

const Consumptions = () => {
  const { data, isLoading } = useQuery('consumptions', consumptionList);

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Header title="Consumptions" breadcrumbItems={[{ label: 'Consumptions', href: '/consumptions' }]} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th isNumeric>Value</Th>
              <Th isNumeric>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((d: Consumption, index: number) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td isNumeric>{d.value}</Td>
                <Td isNumeric>{dayjs(d.date).format('YYYY-MM-DD')}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Consumptions;
