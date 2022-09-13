import { Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, HStack, Button, Icon, IconButton, Text, Tag, Avatar } from "@chakra-ui/react"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { FaPen } from "react-icons/fa";
import NextLink from 'next/link';

import { User } from '../../../../server/entities';
import { useMemo } from "react";

const columnHelper = createColumnHelper<User>();

type UsersTableProps = {
  users: User[]
}

export const UsersTable = ({ users }: UsersTableProps) => {
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

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10
      }
    },
    autoResetPageIndex: false
  });

  return (
    <Flex flex="1" overflowY="hidden" direction="column" w="100%">
      <TableContainer overflowY="scroll" borderRadius="md" flex="1">
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
        {table.getState().pagination.pageIndex > 1 ? <Button 
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button> : <div />}
        <Text>Página <b>{table.getState().pagination.pageIndex + 1}</b> de <b>{table.getPageCount()}</b></Text>
        <Button 
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </Flex>
    </Flex>
  )
}