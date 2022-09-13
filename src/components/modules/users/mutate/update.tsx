import { Alert, AlertIcon, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";

import { trpc } from "../../../../utils/trpc";
import { AppLayout, Loading } from "../../../layouts/AppLayout";

import { Form, FormFields } from "./form";

type UpdateUserProps = {
  id: string;
}

export const UpdateUser = ({ id }: UpdateUserProps) => {
  const router = useRouter();
  const toast = useToast();
  const userMutation = trpc.useMutation(['users.update'], {
    onSuccess: (data) => {
      toast({
        title: 'Sucesso!',
        description: 'Usuário atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
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
  const { data: user } = trpc.useQuery(['users.findById', { id }]);

  const handleUpdateUser = async ({ name, email, role }: FormFields) => {
    userMutation.mutate({ id, name, email, role })
  }

  return (
    <AppLayout title="Atualizar usuário" returnPath="/users">
      {user ? <Form onSubmit={handleUpdateUser} loading={userMutation.isLoading} initialValues={user}/> : <Loading />}
    </AppLayout>
  )
}