import NextLink from 'next/link';
import { Button, Flex, FormControl, FormLabel, Input, Link, Text, VStack } from "@chakra-ui/react"
import { AuthLayout } from "../layouts/AuthLayout"

export const ForgotPassword = () => {
  return (
    <AuthLayout>
      <Text as="h1" fontSize="3xl" fontWeight="bold" mb="8">Recover your password!</Text>
      <Flex as="form" direction="column">
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input id="email" type="email" placeholder="Your e-mail" />
          </FormControl>
          <Button colorScheme="purple" w="100%">SEND</Button>
        </VStack>
      </Flex>
      <NextLink href="/login">
        <Link fontSize="sm" color="gray.500" textAlign="center" mt="2">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Didn't forget your password?
        </Link>
      </NextLink>
    </AuthLayout>
  )
}