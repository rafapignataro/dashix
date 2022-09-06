import { Box, Button, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Input, SimpleGrid, Switch, Text, VStack } from "@chakra-ui/react"
import { FaArrowLeft, FaCog, FaPlus } from "react-icons/fa";
import NextLink from 'next/link';
import { AppLayout } from "../../../layouts/AppLayout";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const CreateUser = () => {
  return (
    <AppLayout title="Criar usuário" returnPath="/users">
      <Flex as="form" w={{ base: '100%'}} marginX="auto" direction="column" >
        <Flex flex="1" direction="column" mb="8">
          <VStack align="center" spacing="4">
            <FormControl>
              <FormLabel htmlFor="name">
                Nome
              </FormLabel>
              <Input id="name" name="name" size="lg" placeholder="Nome" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">
                E-mail
              </FormLabel>
              <Input id="email" name="email" size="lg" placeholder="Email" />
            </FormControl>
            <Box w="100%">
              <Text fontWeight="medium" mb="2">Permissões</Text>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 4 }} spacing="10">
                <Flex direction="column" bg="gray.50" p="4">
                  <Text fontSize="md" fontWeight="bold" mb="2">Usuários</Text>
                  <VStack spacing="2">
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Visualizar</FormLabel>
                      <Switch id="users.list" name="users.list" colorScheme="purple" />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Editar</FormLabel>
                      <Switch id="users.list" name="users.edit" colorScheme="purple" />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Criar</FormLabel>
                      <Switch id="users.list" name="users.create" colorScheme="purple" />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Deletar</FormLabel>
                      <Switch id="users.list" name="users.delete" colorScheme="purple" />
                    </FormControl>
                  </VStack>
                </Flex>
                <Flex direction="column" bg="gray.50" p="4">
                  <Text fontSize="md" fontWeight="bold" mb="2">Leads</Text>
                  <VStack spacing="2">
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Visualizar</FormLabel>
                      <Switch id="users.list" name="users.list" colorScheme="purple"/>
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Editar</FormLabel>
                      <Switch id="users.list" name="users.edit" colorScheme="purple"/>
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Criar</FormLabel>
                      <Switch id="users.list" name="users.create" colorScheme="purple" />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <FormLabel htmlFor="users.list" m="0" mr="4">Deletar</FormLabel>
                      <Switch id="users.list" name="users.delete" colorScheme="purple" />
                    </FormControl>
                  </VStack>
                </Flex>
              </SimpleGrid>
            </Box>
          </VStack>
        </Flex>
        <Flex align="center" justify="flex-end" mb="4">
          <Button colorScheme="purple" w={{ base: '100%', md: '48' }}>Salvar</Button>
        </Flex>
      </Flex>
    </AppLayout>
  )
}