import { Flex, VStack, FormControl, FormLabel, Input, Select, Button, Box, SkeletonText, Skeleton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { Loading } from "@common/Loading";
import { Partner } from '../../../../server/entities'

type FormProps = {
  initialValues?: Partner | null;
  onSubmit: (values: FormFields) => void;
  loading?: boolean;
}

export type FormFields = Omit<Partner, 'id'>;

export const Form = ({ initialValues, onSubmit, loading }: FormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: initialValues || {}
  });

  const { data: states } = trpc.useQuery(['states.findAll']);

  if (!states) return (
    <Box w="100%">
      <SkeletonText mt='4'  />
      <Skeleton mt='4'  />
    </Box>
  )

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
            <FormLabel htmlFor="ddd">
              DDD
            </FormLabel>
            <Input id="ddd" placeholder="DDD" {...register("ddd", { required: true })} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">
              Telefone
            </FormLabel>
            <Input id="phone" placeholder="Phone" type="phone" {...register("phone", { required: true })} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">
            Endere??o
            </FormLabel>
            <Input id="address" placeholder="Endere??o" {...register("address", { required: true })} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="city">
              Cidade
            </FormLabel>
            <Input id="city" placeholder="city" {...register("city", { required: true })} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="stateId">
              Estado
            </FormLabel>
            <Select id="stateId" {...register("stateId", { required: true })} disabled={loading}>
              {states.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="space">
              Espa??o
            </FormLabel>
            <Input id="space" placeholder="Cidade" {...register("space")} disabled={loading}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="instagram">
              Instagram
            </FormLabel>
            <Input id="instagram" placeholder="Instagram" type="email" {...register("instagram")} disabled={loading}/>
          </FormControl>
        </VStack>
      </Flex>
      <Flex align="center" justify="flex-end" mb="4">
        <Button type="submit" colorScheme="brand" w={{ base: '100%', md: '48' }} isLoading={loading}>Salvar</Button>
      </Flex>
    </Flex>
  )
}