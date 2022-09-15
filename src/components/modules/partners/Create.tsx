import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";

import { trpc } from "@utils/trpc";
import { AppLayout } from "@layouts/AppLayout";

import { FormFields, Form } from "./components/Form";

export const CreatePartner = () => {
  const router = useRouter();
  const toast = useToast()

  const mutation = trpc.useMutation(['partners.create'], {
    onSuccess: (data) => {
      toast({
        title: 'Sucesso!',
        description: 'Habilitado criado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/partners');
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

  const handleCreate = async ({ instagram, space, ...data }: FormFields) => {
    mutation.mutate({
      space: space || undefined,
      instagram: instagram || undefined,
      ...data
    });
  }

  return (
    <AppLayout title="Criar habilitado" returnPath="/partners">
      <Form onSubmit={handleCreate} loading={mutation.isLoading} />
    </AppLayout>
  )
}