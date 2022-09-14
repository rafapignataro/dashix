import { Text } from "@chakra-ui/react"

import { AuthLayout } from "../layouts/AuthLayout"

export const EmailVerification = () => {
  return (
    <AuthLayout>
      <Text as="h1" fontSize="3xl" fontWeight="bold" mb="10 " textAlign="center">Dashix</Text>
      <Text as="h2" fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
        Cheque seu e-mail!
      </Text>
      <Text as="h3" fontSize="xl" textAlign="center">
        Um link de acesso foi enviado para sua caixa de entrada!
      </Text>
    </AuthLayout>
  )
}