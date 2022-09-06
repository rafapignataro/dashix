import NextLink from 'next/link';
import { Button, Flex, FormControl, FormLabel, Input, Link, Text, VStack } from "@chakra-ui/react"
import { FaGoogle } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"

import { AuthLayout } from "../layouts/AuthLayout"
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const Login = () => {
  const { data } = useSession();
  const router = useRouter();

  if(data) router.push('/');
  
  return (
    <AuthLayout>
      <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">Dashboard</Text>
      <Flex as="form" direction="column">
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input id="email" type="email" placeholder="Your e-mail" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input id="email" type="email" placeholder="Your password" />
          </FormControl>
          <Button colorScheme="purple" w="100%">LOGIN</Button>
        </VStack>
      </Flex>
      <NextLink href="/forgot-password">
        <Link fontSize="sm" color="gray.500" textAlign="center" mt="2">
          Forgot your password?
        </Link>
      </NextLink>
      <Text fontSize="sm" color="gray.500" textAlign="center" my="4">or</Text>
      <VStack spacing="2">
        <Button w="100%" leftIcon={<FaGoogle />} onClick={() => signIn('google')}>Log in with Google</Button>
      </VStack>
    </AuthLayout>
  )
}