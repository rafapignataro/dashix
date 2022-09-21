import { useToast, Stack, Skeleton, SkeletonText } from "@chakra-ui/react"
import { useRouter } from "next/router";

import { trpc } from "@utils/trpc";
import { AppLayout } from "@layouts/AppLayout";

import { FormFields, Form } from "./components/Form";

export const UpdateUser = () => {
  const router = useRouter();
  const toast = useToast();
  const mutation = trpc.useMutation(['users.update'], {
    onSuccess: (data) => {
      toast({
        title: 'Sucesso!',
        description: 'Habilitado atualizado com sucesso',
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
  const userId = String(router.query.id);

  const { data: user, isLoading } = trpc.useQuery(['users.findById', { id: userId }]);

  const handleUpdate = async (data: FormFields) => {
    mutation.mutate({ id: userId, ...data })
  }

  return (
    <AppLayout title="Atualizar usuário" returnPath="/users">
      {isLoading && (
        <Stack w="100%">
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
          <SkeletonText noOfLines={2} w="50%" />
          <Skeleton height="20px" />
        </Stack>
      )}
      {!isLoading && <Form onSubmit={handleUpdate} loading={mutation.isLoading} initialValues={user} />}
    </AppLayout>
  )
}