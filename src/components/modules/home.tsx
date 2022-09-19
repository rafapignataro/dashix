import { Avatar, Box, Flex, Grid, GridItem, HStack, Icon, Link, Select, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"
import { useSession } from "next-auth/react";
import NextLink from 'next/link';
import { useMemo } from 'react'

import { AppLayout } from "@layouts/AppLayout"

import {
  Chart as Chartjs,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Line, Pie } from 'react-chartjs-2';

import { colorTheme } from "../../styles/theme";

{/* 
  <Text fontSize={{ sm: 'xl', md: '2xl', lg: '2xl', xl: '4xl' }} fontWeight="bold">389</Text>
  <HStack mt="4">
    <Icon as={FaArrowAltCircleUp} h="4" w="4" color="green.500" />
    <Text>23.36%</Text>
  </HStack> 
*/}

export const Home = () => {
  const { data: session } = useSession();

  return (
    <AppLayout title={`Bem vindo, ${session?.user.name?.split(' ')[0]}`}>
      <Grid templateColumns="1fr 1fr 1fr" templateRows="1fr 1fr" gap="4" h="100%">
        <GridItem colSpan={2} rowSpan={1}>
          <Tabs 
            flex="1" 
            variant="soft-rounded" 
            colorScheme="brand"
            bg="white"
            p="4"
            height="100%"
            width="100%"
            display="flex" 
            flexDirection="column"
            borderRadius="lg"
          >
            <TabList>
              <Flex align="center" justify="space-between" w="100%">
                <HStack>
                  <Tab borderRadius="md">
                    Leads
                  </Tab>
                  <Tab borderRadius="md">
                    Leads Convertidos
                  </Tab>
                  <Tab borderRadius="md">
                    Vendas
                  </Tab>
                  <Tab borderRadius="md">
                    Custos
                  </Tab>
                </HStack>
                <Select placeholder="Selecione um período" defaultValue="6" w={{ base: '100%', md: '52' }} bg="white">
                  <option value="6">Últimos 6 meses</option>
                  <option value="12">Últimos 12 meses</option>
                  <option value="24">Últimos 24 meses</option>
                </Select>
              </Flex>
            </TabList>
            <TabPanels mt="2" h="100%" flex="1">
              <TabPanel p="0" h="100%">
                <Chart />
              </TabPanel>
              <TabPanel p="0" h="100%">
                <Chart />
              </TabPanel>
              <TabPanel p="0" h="100%">
                <Chart />
              </TabPanel>
              <TabPanel p="0" h="100%">
                <Chart />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Flex direction="column" w="100%" h="100%" borderRadius="md" p="4" bg="white">
            <Flex align="flex-end" justify="space-between" mb="6">
              <Text fontSize="2xl" fontWeight="bold">Atividade</Text>
              <NextLink href="/activity" passHref>
                <Link colorScheme="teal" color="brand.700" fontWeight="bold">Ver mais</Link>
              </NextLink>
            </Flex>
            <VStack spacing="8">
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Rafael Pignataro" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Rafael Pignataro</Text>
                    <Text>Adicionou um novo habilitado</Text>
                  </Flex>
                </Flex>
                <Text>
                  10m
                </Text>
              </Flex>
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Luiz Fernando" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Luiz Fernando</Text>
                    <Text>Adicionou um novo lead</Text>
                  </Flex>
                </Flex>
                <Text>
                  48m
                </Text>
              </Flex>
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Gabriel Zago" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Gabriel Zago</Text>
                    <Text>Adicionou uma nova venda</Text>
                  </Flex>
                </Flex>
                <Text>
                  1h48m
                </Text>
              </Flex>
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Rafael Pignataro" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Rafael Pignataro</Text>
                    <Text>Adicionou um novo habilitado</Text>
                  </Flex>
                </Flex>
                <Text>
                  3h35m
                </Text>
              </Flex>
            </VStack>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Flex direction="column" w="100%" h="100%" p="4" bg="white">
            <Text fontSize="2xl" fontWeight="bold" mb="6">Habilitados por estado</Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Flex direction="column" w="100%" h="100%" borderRadius="md" p="4" bg="white">
            <Flex align="flex-end" justify="space-between" mb="6">
              <Text fontSize="2xl" fontWeight="bold">Ultimas vendas</Text>
              <NextLink href="/activity" passHref>
                <Link colorScheme="teal" color="brand.700" fontWeight="bold">Ver mais</Link>
              </NextLink>
            </Flex>
            <VStack spacing="8">
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Rafael Pignataro" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Rafael Pignataro</Text>
                    <Text>Adicionou um novo habilitado</Text>
                  </Flex>
                </Flex>
                <Text>
                  10m
                </Text>
              </Flex>
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Luiz Fernando" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Luiz Fernando</Text>
                    <Text>Adicionou um novo lead</Text>
                  </Flex>
                </Flex>
                <Text>
                  48m
                </Text>
              </Flex>
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Gabriel Zago" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Gabriel Zago</Text>
                    <Text>Adicionou uma nova venda</Text>
                  </Flex>
                </Flex>
                <Text>
                  1h48m
                </Text>
              </Flex>
              <Flex align="flex-start" justify="space-between" w="100%">
                <Flex align="center">
                  <Avatar name="Rafael Pignataro" size="md" mr="4"/>
                  <Flex direction="column">
                    <Text fontWeight="bold">Rafael Pignataro</Text>
                    <Text>Adicionou um novo habilitado</Text>
                  </Flex>
                </Flex>
                <Text>
                  3h35m
                </Text>
              </Flex>
            </VStack>
          </Flex>
        </GridItem>
      </Grid>
    </AppLayout>
  )
}

export const Chart = () => {
  const getRandom7 = useMemo(() => {
    const final = [];
    for (let index = 0; index < 7; index++) {
      const num = Math.floor(Math.random() * 10) + 30;

      final.push(num);
    }

    return final;
  }, []);

  return (
    <Line 
      data={{ 
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        datasets: [
          {
            data: getRandom7,
            label: 'Leads',
            pointBorderWidth: 2,
            borderColor: colorTheme['700'],
            pointRadius: 30, 
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverRadius: 8,
            pointHoverBackgroundColor: colorTheme['700'],
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: 4,
            tension: 0.3,
            fill: {
              target: 'origin',
              above: colorTheme['50'],
            }
          },
        ]
      }} 
      height="100%"
      width="100%"
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#787878',
              font: {
                weight: 'bold'
              }
            },
          },
          y: {
            min: 25, 
            grid: {
              display: true,
              drawBorder: true,
              borderDash: [4, 4]
            },
            ticks: {
              color: '#787878',
              font: {
                weight: 'bold'
              }
            }
          }
        }
      }} 
    />
  )
}