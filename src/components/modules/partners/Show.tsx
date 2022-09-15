import { useMemo } from "react";
import { Flex, InputGroup, InputLeftElement, Icon, Input, Button, Avatar, HStack, IconButton, Text } from "@chakra-ui/react"
import { FaSearch, FaPlus, FaPen } from "react-icons/fa"
import NextLink from 'next/link';
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Partner } from "../../../server/entities";

import { trpc } from "@utils/trpc";
import { AppLayout } from "@layouts/AppLayout";
import { Table } from "@common/Table";

const columnHelper = createColumnHelper<Partner>();

export const ShowPartners = () => {
  const { data: partners } = trpc.useQuery(['partners.findAll']);

  const columns: ColumnDef<Partner>[] = useMemo(() => [
    columnHelper.display({
      id: 'actions',
      header: () => <p></p>,
      cell: info => 
        <NextLink href={`/partners/${info.row.original.id}`}>
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
    columnHelper.display({
      id: 'phone',
      header: () => 'TELEFONE',
      cell: info => `(${info.row.original.ddd}) - ${info.row.original.phone}`,
    }),
    columnHelper.display({
      id: 'address',
      header: () => 'ENDEREÇO',
      cell: info => info.row.original.address,
    }),
    columnHelper.display({
      id: 'city',
      header: () => 'Cidade',
      cell: info => info.row.original.city,
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
        <NextLink href="/partners/create" passHref>
          <Button as="a" leftIcon={<Icon as={FaPlus} />} colorScheme="purple" px={{ base: 8, md: 6}}>
            Adicionar
          </Button>
        </NextLink>
      </Flex>
      <Table data={partners} columns={columns} />
    </AppLayout>
  )
}