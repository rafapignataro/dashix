import { Skeleton, SkeletonText, Stack, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";

import { trpc } from "@utils/trpc";
import { AppLayout } from "@layouts/AppLayout";

import { FormFields, Form } from "./components/Form";

export const UpdatePartner = () => {
  const router = useRouter();
  const toast = useToast();
  const mutation = trpc.useMutation(['partners.update'], {
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

  const partnerId = String(router.query.id);

  const { data: partner, isLoading } = trpc.useQuery(['partners.findById', { id: partnerId }]);

  const handleUpdate = async ({ space, instagram, ...data}: FormFields) => {
    mutation.mutate({ 
      id: partnerId,
      space: space || undefined,
      instagram: instagram  || undefined,
      ...data 
    })
  }

  return (
    <AppLayout title="Atualizar habilitado" returnPath="/partners">
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
      {!isLoading && <Form onSubmit={handleUpdate} loading={mutation.isLoading} initialValues={partner} />}
    </AppLayout>
  )
}