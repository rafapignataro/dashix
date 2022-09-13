import NextLink from 'next/link';
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Link, Text, useToast, VStack } from "@chakra-ui/react"
import { FaGoogle } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"

import { AuthLayout } from "../layouts/AuthLayout"
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormFields = {
  email: string;
}

export const Login = () => {
  const { data } = useSession();
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormFields>();

  const [loading, setLoading] = useState(false);

  if(data) router.push('/');
  
  useEffect(() => {
    if (router.query.error) {
      toast({
        title: 'Erro!',
        description: 'Não existe uma conta com esse e-mail!',
        status: 'error'
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.error])

  const handleLogin = ({ email }: LoginFormFields) => {
    setLoading(true)
    signIn('email', { email })
  }
  
  return (
    <AuthLayout>
      <Text as="h1" fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">Dashix</Text>
      <Flex as="form" direction="column" onSubmit={handleSubmit(handleLogin)}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input id="email" type="email" placeholder="E-mail" disabled={loading} {...register('email', { required: true })}/>
          </FormControl>
          {/* <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input id="email" type="email" placeholder="Your password" />
          </FormControl> */}
          <Button type="submit" colorScheme="purple" w="100%" isLoading={loading}>LOGIN</Button>
        </VStack>
      </Flex>
      {/* <NextLink href="/forgot-password">
        <Link fontSize="sm" color="gray.500" textAlign="center" mt="2">
          Forgot your password?
        </Link>
      </NextLink> */}
      {/* <Box w="100%" py="6" position="relative">
        <Divider bg="gray.200"/>
        <Text 
          fontSize="sm" 
          color="gray.500" 
          textAlign="center" 
          position="absolute" 
          top="50%" 
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          px="4"
        >or</Text>
      </Box>
      <VStack spacing="2">
        <Button w="100%" leftIcon={<FaGoogle />} onClick={() => signIn('google')}>Logar com Google</Button>
      </VStack> */}
    </AuthLayout>
  )
}