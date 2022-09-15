import { Flex, VStack, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Loading } from "@common/Loading";

import { User } from '../../../../server/entities'

type FormProps = {
  initialValues?: User | null;
  onSubmit: (values: FormFields) => void;
  loading?: boolean;
  isUpdate?: boolean;
}

export type FormFields = Omit<User, 'id'>;

export const Form = ({ initialValues, onSubmit, loading, isUpdate }: FormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: initialValues || {}
  });

  if(isUpdate && !initialValues) return <Loading />

  return (
    <Flex as="form" w={{ base: '100%'}} marginX="auto" direction="column" onSubmit={handleSubmit(onSubmit)}>
      <Flex flex="1" direction="column" mb="8">
        <VStack align="center" spacing="4">
        <FormControl>
            <FormLabel htmlFor="name">
              Nome
            </FormLabel>
            <Input id="name" placeholder="Nome" {...register("name", { required: true })} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">
              E-mail
            </FormLabel>
            <Input id="email" placeholder="Email" type="email" {...register("email", { required: true })} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">
              Nível de acesso
            </FormLabel>
            <Select {...register("role", { required: true })} disabled={loading}>
              <option value="USER">Usuário</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </Select>
          </FormControl>
        </VStack>
      </Flex>
      <Flex align="center" justify="flex-end" mb="4">
        <Button type="submit" colorScheme="purple" w={{ base: '100%', md: '48' }} isLoading={isSubmitting}>Salvar</Button>
      </Flex>
    </Flex>
  )
}