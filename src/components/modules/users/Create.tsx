import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";

import { trpc } from "@utils/trpc";
import { AppLayout } from "@layouts/AppLayout";

import { FormFields, Form } from "./components/Form";

export const CreateUser = () => {
  const router = useRouter();
  const toast = useToast()

  const mutation = trpc.useMutation(['users.create'], {
    onSuccess: (data) => {
      toast({
        title: 'Sucesso!',
        description: 'Usuário criado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
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

  const handleCreate = async (data: FormFields) => {
    mutation.mutate(data);
  }

  return (
    <AppLayout title="Criar usuário" returnPath="/users">
      <Form onSubmit={handleCreate} loading={mutation.isLoading} />
    </AppLayout>
  )
}