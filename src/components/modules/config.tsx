import { Tabs, TabList, Tab, TabPanels, TabPanel, HStack, Flex, Avatar, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { useSession } from "next-auth/react";

import { AppLayout } from "@layouts/AppLayout"

export const Config = () => {
  const { data: session } = useSession();

  return (
    <AppLayout title="Configurações">
      <Tabs flex="1" variant="soft-rounded" colorScheme="purple">
        <TabList>
          <HStack spacing="4">
            <Tab>Perfil</Tab>
            <Tab>Geral</Tab>
          </HStack>
        </TabList>
        <TabPanels mt="4"  h="90%">
          <TabPanel>
            <Flex direction="column">
              <Avatar src={String(session?.user?.image)} name={String(session?.user?.name)}size="2xl" mb="4"/>
              <VStack>
                <FormControl>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <Input id="name" name="name" placeholder="Nome" value={String(session?.user?.name)}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" name="email" type="email" placeholder="Nome" value={String(session?.user?.email)}/>
                </FormControl>
              </VStack>
              <Flex align="center" justify="flex-end" mt="6" w="100%">
                <Button colorScheme="purple" w={{ base: '100%', md: '48' }}>Salvar</Button>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>Geral</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  )
}