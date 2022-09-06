import { Button, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Input, Text, VStack } from "@chakra-ui/react"
import { FaArrowLeft, FaCog, FaPlus } from "react-icons/fa";
import NextLink from 'next/link';
import { AppLayout } from "../../../layouts/AppLayout";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type UpdateUserProps = {
  user: User;
}

export const UpdateUser = ({ user }: UpdateUserProps) => {
  return (
    <AppLayout title="Atualizar usuário" returnPath="/users">
      <Flex as="form" w={{ base: '100%'}} marginX="auto" direction="column" >
        <Flex flex="1" direction="column" mb="8">
          <VStack align="center" spacing="4">
            <FormControl>
              <FormLabel htmlFor="name">
                Nome
              </FormLabel>
              <Input id="name" name="name" size="lg" placeholder="Nome" value={user.name}/>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">
                E-mail
              </FormLabel>
              <Input id="email" name="email" size="lg" placeholder="Email" value={user.email}/>
            </FormControl>
          </VStack>
        </Flex>
        <Flex align="center" justify="flex-end" mb="4">
          <Button colorScheme="purple" w={{ base: '100%', md: '48' }}>Salvar</Button>
        </Flex>
      </Flex>
    </AppLayout>
  )
}