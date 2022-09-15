import { Button, Flex, FormControl, FormLabel, Input, Text, useToast, VStack } from "@chakra-ui/react"
import { useSession, signIn } from "next-auth/react"

import { AuthLayout } from "../layouts/AuthLayout"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
          <Button type="submit" colorScheme="brand" w="100%" isLoading={loading}>LOGIN</Button>
        </VStack>
      </Flex>
    </AuthLayout>
  )
}