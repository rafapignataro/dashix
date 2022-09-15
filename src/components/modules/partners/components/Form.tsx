import { Flex, VStack, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { Loading } from "@common/Loading";
import { Partner } from '../../../../server/entities'

type FormProps = {
  initialValues?: Partner | null;
  onSubmit: (values: FormFields) => void;
  loading?: boolean;
  isUpdate?: boolean;
}

export type FormFields = Omit<Partner, 'id'>;

export const Form = ({ initialValues, onSubmit, loading, isUpdate }: FormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: initialValues || {}
  });

  const { data: states } = trpc.useQuery(['states.findAll']);

  if(isUpdate && !initialValues) return <Loading />

  if (!states) return <Loading />;

  return (
    <Flex as="form" w={{ base: '100%'}} marginX="auto" direction="column" onSubmit={handleSubmit(onSubmit)}>
      <Flex flex="1" direction="column" mb="8">
        <VStack align="center" spacing="4">
          <FormControl>
            <FormLabel htmlFor="name">
              Nome
            </FormLabel>
            <Input id="name" placeholder="Nome" {...register("name", { required: true })} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">
              E-mail
            </FormLabel>
            <Input id="email" placeholder="Email" type="email" {...register("email", { required: true })} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ddd">
              DDD
            </FormLabel>
            <Input id="ddd" placeholder="DDD" {...register("ddd", { required: true })} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">
              Telefone
            </FormLabel>
            <Input id="phone" placeholder="Phone" type="phone" {...register("phone", { required: true })} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">
            Endereço
            </FormLabel>
            <Input id="address" placeholder="Endereço" {...register("address", { required: true })} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="city">
              Cidade
            </FormLabel>
            <Input id="city" placeholder="city" {...register("city", { required: true })} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="stateId">
              Estado
            </FormLabel>
            <Select id="stateId" {...register("stateId", { required: true })} disabled={isSubmitting}>
              {states.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="space">
              Espaço
            </FormLabel>
            <Input id="space" placeholder="Cidade" {...register("space")} disabled={isSubmitting}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="instagram">
              Instagram
            </FormLabel>
            <Input id="instagram" placeholder="Instagram" type="email" {...register("instagram")} disabled={isSubmitting}/>
          </FormControl>
        </VStack>
      </Flex>
      <Flex align="center" justify="flex-end" mb="4">
        <Button type="submit" colorScheme="purple" w={{ base: '100%', md: '48' }} isLoading={isSubmitting}>Salvar</Button>
      </Flex>
    </Flex>
  )
}