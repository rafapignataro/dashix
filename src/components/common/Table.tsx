import { Flex, TableContainer, Table as ChakraTable, Thead, Tr, Th, Tbody, Td, HStack, Button, Icon, IconButton, Text, Tag, Avatar } from "@chakra-ui/react"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { FaPen } from "react-icons/fa";
import NextLink from 'next/link';

import { User } from '../../server/entities';
import { Loading } from "@common/Loading";

type TableProps<T> = {
  data?: T[]
  columns: ColumnDef<T>[]
}

export const Table = <T extends {}>({ data, columns }: TableProps<T>) => {
  const table = useReactTable({
    data: data || [],
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

  if (!data) return <Loading />

  return (
    <Flex flex="1" overflowY="hidden" direction="column" w="100%" bg="white">
      <TableContainer overflowY="scroll" borderRadius="md" flex="1">
        <ChakraTable size="md" >
          <Thead bg="gray.100">
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
        </ChakraTable>
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