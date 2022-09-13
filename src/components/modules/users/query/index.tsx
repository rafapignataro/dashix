import { Flex, InputGroup, InputLeftElement, Icon, Input, Button } from "@chakra-ui/react"
import { FaSearch, FaPlus } from "react-icons/fa"
import NextLink from 'next/link';

import { AppLayout, Loading } from "../../../layouts/AppLayout"
import { UsersTable } from "./Table"
import { trpc } from "../../../../utils/trpc";

export const QueryUsers = () => {
  const { data: users } = trpc.useQuery(['users.findAll']);
  
  return (
    <AppLayout title="Usuários">
      <Flex align="center" justify="space-between" mb="4">
        <InputGroup  w={{ base: '100%', md: 'auto' }} mr={{ base: '2', md: 0 }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Procurar" size="md" _focus={{ borderColor: 'purple.500' }} />
        </InputGroup>
        <NextLink href="/users/create" passHref>
          <Button as="a" leftIcon={<Icon as={FaPlus} />} colorScheme="purple">
            Adicionar
          </Button>
        </NextLink>
      </Flex>
      {users ? <UsersTable users={users} /> : <Loading /> }
    </AppLayout>
  )
}