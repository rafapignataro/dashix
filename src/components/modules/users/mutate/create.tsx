import { Alert, AlertIcon, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";

import { trpc } from "../../../../utils/trpc";
import { AppLayout } from "../../../layouts/AppLayout";
import { Form, FormFields } from "./form";

export const CreateUser = () => {
  const router = useRouter();
  const toast = useToast()

  const userMutation = trpc.useMutation(['users.create'], {
    onSuccess: (data) => {
      router.push('/users');
    },
    onError: ({ message }) => {
      toast({
        title: 'Erro',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  });

  const handleCreateUser = async ({ name, email, role }: FormFields) => {
    userMutation.mutate({ name, email, role });
  }

  return (
    <AppLayout title="Criar usuário" returnPath="/users">
      <Form onSubmit={handleCreateUser} loading={userMutation.isLoading} />
    </AppLayout>
  )
}