import { useMemo } from "react";
import { Flex, InputGroup, InputLeftElement, Icon, Input, Button, Avatar, HStack, IconButton, Tag, Text } from "@chakra-ui/react"
import { FaSearch, FaPlus, FaPen } from "react-icons/fa"
import NextLink from 'next/link';
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { User } from "../../../server/entities";

import { trpc } from "@utils/trpc";
import { AppLayout } from "@layouts/AppLayout";
import { Table } from "@common/Table";

const columnHelper = createColumnHelper<User>();

export const ShowUsers = () => {
  const { data: users } = trpc.useQuery(['users.findAll']);

  const columns: ColumnDef<User>[] = useMemo(() => [
    columnHelper.display({
      id: 'actions',
      header: () => <p></p>,
      cell: info => 
        <NextLink href={`/users/${info.row.original.id}`}>
          <IconButton
            cursor="pointer" 
            as="a" 
            size="sm" 
            icon={<Icon as={FaPen} h="4" w="4" />} 
            aria-label="edit button" 
            variant="ghost" 
            colorScheme="purple"  
          />
        </NextLink>
      ,
    }),
    columnHelper.display({
      id: 'role',
      header: () => 'PERMISSÃO',
      cell: info => <Tag colorScheme="purple">{info.row.original.role}</Tag>,
    }),
    columnHelper.display({
      id: 'name',
      header: () => 'NOME',
      cell: info => <HStack spacing="4">
        <Avatar name={String(info.row.original.name)} size="sm"/>
        <Text>{info.row.original.name}</Text>
      </HStack>,
    }),
    columnHelper.display({
      id: 'email',
      header: () => 'EMAIL',
      cell: info => info.row.original.email,
    }),
  ], [])

  return (
    <AppLayout title="Habilitados">
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
      <Table data={users} columns={columns} />
    </AppLayout>
  )
}