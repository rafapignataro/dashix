import { Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, HStack, Button, Icon, IconButton, Text, Tag, Avatar } from "@chakra-ui/react"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { FaPen } from "react-icons/fa";
import NextLink from 'next/link';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  actions: string
  permission: string;
}

const data = [
  {
    id: 'jr8j42r843f43hf',
    name: 'Rafael Mira Pignataro',
    email: 'rafapignataro@gmail.com',
    createdAt: '18:47 04/09/2022',
    permission: 'ADMIN',
    actions: '',
  },
  {
    id: 'jr8j42r843f43hf',
    name: 'Gabriel Zago',
    email: 'gabriel.zago@gmail.com',
    createdAt: '13:24 24/08/2022',
    permission: 'BÁSICO',
    actions: '',
  },
  {
    id: 'jr8j42r843f43hf',
    name: 'Luiz Fernando',
    email: 'luiz.fernando@gmail.com',
    createdAt: '13:24 24/08/2022',
    permission: 'BÁSICO',
    actions: '',
  },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
  // {
  //   id: 'jr8j42r843f43hf',
  //   name: 'Gabriel Zago',
  //   email: 'gabriel.zago@gmail.com',
  //   createdAt: '13:24 24/08/2022'
  // },
]

const columnHelper = createColumnHelper<User>();

const columns: ColumnDef<User>[] = [
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
    id: 'permission',
    header: () => 'PERMISSÃO',
    cell: info => <Tag colorScheme="purple">{info.row.original.permission}</Tag>,
  }),
  columnHelper.display({
    id: 'name',
    header: () => 'NOME',
    cell: info => <HStack spacing="4">
      <Avatar name={info.row.original.name} size="sm"/>
      <Text>{info.row.original.name}</Text>
    </HStack>,
  }),
  columnHelper.display({
    id: 'email',
    header: () => 'EMAIL',
    cell: info => info.row.original.email,
  }),
  columnHelper.display({
    id: 'createdAt',
    header: () => 'DATA DE CRIAÇÃO',
    cell: info => info.row.original.createdAt,
  }),
  
]

export const UsersTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  
  return (
    <Flex flex="1" overflowY="hidden" direction="column" w="100%">
        <TableContainer overflowY="scroll" borderRadius="md">
          <Table size="md" >
            <Thead bg="gray.50">
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex align="center" justify="space-between" mt="4">
          <Text><b>1</b> of <b>32</b> pages</Text>
          <HStack>
            <Button size="sm" disabled>0</Button>
            <Button size="sm" colorScheme="purple">1</Button>
            <Button size="sm">2</Button>
          </HStack>
        </Flex>
      </Flex>
  )
}