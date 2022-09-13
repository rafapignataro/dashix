import NextLink from 'next/link';
import { HStack, Link, Text } from "@chakra-ui/react"

import { AuthLayout } from "../layouts/AuthLayout"

export const Logout = () => {
  return (
    <AuthLayout>
      <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">Dashix</Text>
      <Text as="h2" fontSize="xl" fontWeight="bold" mb="4" textAlign="center">Você tem certeza que deseja sair?</Text>
      <HStack>
        <NextLink href="/">
          <Link fontSize="sm" color="gray.500" textAlign="center" mt="2">
            Voltar
          </Link>
        </NextLink>
        <NextLink href="/">
          <Link fontSize="sm" color="gray.500" textAlign="center" mt="2">
            Voltar
          </Link>
        </NextLink>
      </HStack>
    </AuthLayout>
  )
}