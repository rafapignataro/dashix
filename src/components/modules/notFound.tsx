import { Button, Text } from "@chakra-ui/react"
import NextLink from 'next/link';

import { AuthLayout } from "../layouts/AuthLayout"
import { useUser } from "../../hooks/useUser";
import { AppLayout } from "../layouts/AppLayout";

export const NotFound = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <AuthLayout>
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">Dashix</Text>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">Essa página não existe :(</Text>
        <NextLink href="/login" passHref>
          <Button as="a">
            Voltar para o login
          </Button>
        </NextLink>
      </AuthLayout>
    )
  }

  return (
    <AppLayout>
      <AuthLayout>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">Essa página não existe :(</Text>
      </AuthLayout>
    </AppLayout>
  )
}