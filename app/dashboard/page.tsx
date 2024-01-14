'use client';
import { consumptionList } from '@/api/consumption/list.api';
import { indexList } from '@/api/index/list.api';
import Header from '@/components/ui/Header';
import Loader from '@/components/ui/Loader';
import { Consumption } from '@/interfaces/consumption.interface';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Dahsboard = () => {
  const { data, isLoading, refetch } = useQuery('dashboard-consumptions', consumptionList);
  const { data: indexData, isLoading: indexIsLoading, refetch: indexRefetch } = useQuery('dashboard-index', indexList);

  useEffect(() => {
    refetch();
    indexRefetch();
  }, []);

  if (isLoading || indexIsLoading) <Loader />;

  const totalIndex = indexData?.reduce((acc: number, curr: any) => acc + curr.value, 0);

  return (
    <Box>
      <Header title="Dashboard" breadcrumbItems={[]} />

      <SimpleGrid
        columns={{
          base: 1,
          md: 12,
        }}
      >
        <GridItem
          colSpan={{
            base: 1,
            md: 4,
          }}
        >
          {!indexIsLoading && (
            <Chart
              options={{
                chart: {
                  height: 350,
                  type: 'radialBar',
                },
                plotOptions: {
                  radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                      margin: 0,
                      size: '70%',
                      background: '#fff',
                      image: undefined,
                      imageOffsetX: 0,
                      imageOffsetY: 0,
                      position: 'front',
                      dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24,
                      },
                    },
                    track: {
                      background: '#fff',
                      strokeWidth: '67%',
                      margin: 0, // margin is in pixels
                      dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35,
                      },
                    },

                    dataLabels: {
                      show: true,
                      name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '17px',
                      },
                      value: {
                        formatter: function (val: number): any {
                          return val;
                        },
                        color: '#111',
                        fontSize: '36px',
                        show: true,
                      },
                    },
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#ABE5A1'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                  },
                },
                stroke: {
                  lineCap: 'round',
                },
                labels: ['Total Index'],
              }}
              series={[totalIndex]}
              type="radialBar"
            />
          )}
        </GridItem>
        <GridItem
          colSpan={{
            base: 1,
            md: 8,
          }}
        >
          {!isLoading && (
            <Chart
              options={{
                chart: {
                  height: 350,
                  type: 'area',
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: 'smooth',
                },
                xaxis: {
                  type: 'datetime',
                  categories: data?.map((d: Consumption) => dayjs(d.date).format('YYYY-MM-DD')),
                },
                tooltip: {
                  x: {
                    format: 'dd/MM/yy',
                  },
                },
              }}
              series={[
                {
                  name: 'Consumption',
                  data: data?.map((d: Consumption) => d.value),
                },
              ]}
              type="area"
              height={'350'}
            />
          )}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Dahsboard;
