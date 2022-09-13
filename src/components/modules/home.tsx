import { Box, Flex, HStack, Icon, Select, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { AppLayout } from "../layouts/AppLayout"
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useSession } from "next-auth/react";

import {
  Chart as Chartjs,
  CategoryScale,
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
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Line } from 'react-chartjs-2';


export const Home = () => {
  const { data: session } = useSession();

  return (
    <AppLayout title={`Bem vindo, ${session?.user.name?.split(' ')[0]}`}>
      <Tabs flex="1" variant="soft-rounded" colorScheme="purple" w="100%" display="flex" flexDirection="column">
        <TabList>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing="4" w="100%">
            <Tab borderRadius="md" bg="gray.50">
              <Flex w="100%" h="100%" direction="column" justify="flex-start" textAlign="left">
                <Text>Leads</Text>
                <Text fontSize={{ sm: 'xl', md: '2xl', lg: '2xl', xl: '4xl' }} fontWeight="bold">389</Text>
                <HStack mt="4">
                  <Icon as={FaArrowAltCircleUp} h="4" w="4" color="green.500" />
                  <Text>23.36%</Text>
                </HStack>
              </Flex>
            </Tab>
            <Tab borderRadius="md" bg="gray.50">
              <Flex w="100%" h="100%" direction="column" justify="flex-start" textAlign="left">
                <Text>Leads Convertidos</Text>
                <Text fontSize={{ sm: 'xl', md: '2xl', lg: '2xl', xl: '4xl' }} fontWeight="bold">137</Text>
                <HStack mt="4">
                  <Icon as={FaArrowAltCircleUp} h="4" w="4" color="green.500" />
                  <Text>14.23%</Text>
                </HStack>
              </Flex>
            </Tab>
            <Tab borderRadius="md" bg="gray.50">
              <Flex w="100%" h="100%" direction="column" justify="flex-start" textAlign="left">
                <Text>Vendas</Text>
                <Text fontSize={{ sm: 'xl', md: '2xl', lg: '2xl', xl: '4xl' }} fontWeight="bold">R$ 63.574,00</Text>
                <HStack mt="4">
                  <Icon as={FaArrowAltCircleDown} h="4" w="4" color="red.500" />
                  <Text>6.56%</Text>
                </HStack>
              </Flex>
            </Tab>
            <Tab borderRadius="md" bg="gray.50">
              <Flex w="100%" h="100%" direction="column" justify="flex-start" textAlign="left">
                <Text>Custos</Text>
                <Text fontSize={{ sm: 'xl', md: '2xl', lg: '2xl', xl: '4xl' }} fontWeight="bold">R$ 38.429,00</Text>
                <HStack mt="4">
                  <Icon as={FaArrowAltCircleUp} h="4" w="4" color="green.500" />
                  <Text>38.23%</Text>
                </HStack>
              </Flex>
            </Tab>
          </SimpleGrid>
        </TabList>
        <TabPanels mt="6" flex="1">
          <TabPanel h="100%" display="flex" flexDirection="column" p="0">
            <Flex align="center" justify="space-between" mb="4">
              <Text fontSize="3xl" fontWeight="bold" color="gray.700">Leads</Text>
              <Select placeholder="Selecione um período" defaultValue="6" w={{ base: '100%', md: '52' }}>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Últimos 12 meses</option>
                <option value="24">Últimos 24 meses</option>
              </Select>
            </Flex>
            <Box flex="1" h="100%">
              <Chart />
            </Box>
          </TabPanel>
          <TabPanel h="100%" display="flex" flexDirection="column" p="0">
            <Flex align="center" justify="space-between" mb="4">
              <Text fontSize="3xl" fontWeight="bold" color="gray.700">Leads Convertidos</Text>
              <Select placeholder="Selecione um período" defaultValue="6" w={{ base: '100%', md: '52' }}>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Últimos 12 meses</option>
                <option value="24">Últimos 24 meses</option>
              </Select>
            </Flex>
            <Box flex="1" h="100%">
              <Chart />
            </Box>
          </TabPanel>
          <TabPanel h="100%" display="flex" flexDirection="column" p="0">
            <Flex align="center" justify="space-between" mb="4">
              <Text fontSize="3xl" fontWeight="bold" color="gray.700">Vendas</Text>
              <Select placeholder="Selecione um período" defaultValue="6" w={{ base: '100%', md: '52' }}>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Últimos 12 meses</option>
                <option value="24">Últimos 24 meses</option>
              </Select>
            </Flex>
            <Box flex="1" h="100%">
              <Chart />
            </Box>
          </TabPanel>
          <TabPanel h="100%" display="flex" flexDirection="column" p="0">
            <Flex align="center" justify="space-between" mb="4">
              <Text fontSize="3xl" fontWeight="bold" color="gray.700">Custos</Text>
              <Select placeholder="Selecione um período" defaultValue="6" w={{ base: '100%', md: '52' }}>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Últimos 12 meses</option>
                <option value="24">Últimos 24 meses</option>
              </Select>
            </Flex>
            <Box flex="1" h="100%">
              <Chart />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  )
}

export const Chart = () => {
  const getRandom7 = () => {
    const final = [];
    for (let index = 0; index < 7; index++) {
      const num = Math.floor(Math.random() * 10) + 30;

      final.push(num);
    }

    return final;
  }

  return (
    <Line 
      data={{ 
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [
          {
            data: getRandom7(),
            label: 'Leads',
            borderColor: '#d6bcfa',
            backgroundColor: '#44337a',
            pointBorderWidth: 2,
            pointBackgroundColor: '#d6bcfa',
            pointBorderColor: '#44337a',
            pointRadius: 6, 
            tension: 0.3,
            fill: {
              target: 'origin',
              above: '#e9d8fd',
            }
          }
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
              display: false
            }
          },
          y: {
            min: 25, 
            grid: {
              display: false
            }
          }
        }
      }} 
    />
  )
}