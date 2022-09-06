import NextLink from 'next/link';
import { Avatar, Button, Drawer, DrawerContent, DrawerOverlay, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Input, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react"
import { FaArrowLeft, FaBars, FaCog, FaExclamationTriangle, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

type AppLayoutProps = {
  title?: string;
  returnPath?: string;
  children: React.ReactNode;
}

export const AppLayout = ({ title, returnPath, children }: AppLayoutProps) => {
  const { data: session } = useSession();
  const isMobile = useBreakpointValue({ base: true, lg: false,  });
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex h="100vh">
      {!isMobile && <Aside />}
      <Flex as="main" flex="1" direction="column" p="4" w="calc(100vw - var(--chakra-sizes-60))" h="100%">
        <Flex as="header" h="8" align="center" justify="space-between" mb="6">
          <Flex align="center">
            {isMobile && (
              <IconButton 
                variant="link" 
                size="lg" 
                icon={<Icon as={FaBars} h="6" w="6" />} 
                aria-label="Open drawer button" 
                onClick={onOpen}
              />
            )}
            {returnPath && (
              <NextLink href="/users" passHref>
                <IconButton as="a" icon={<Icon as={FaArrowLeft} />} colorScheme="gray" variant="link" aria-label="back anchor" mr="2" />
              </NextLink>
            )}
            {title && <Text as="h2" fontSize="2xl" fontWeight="bold">{title}</Text>}
          </Flex>
          <Menu>
            <MenuButton as={Button} bg="transparent" px="2">
              <Flex align="center">
              <Text>{String(session?.user?.email)}</Text>
              <Avatar src={String(session?.user?.image)} name={String(session?.user?.name)} size="sm" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList>
              <NextLink href="/config" passHref>
                <MenuItem as="a" display="flex" alignItems="center">
                  <Icon as={FaCog} h="4" w="4" mr="4"/>
                  <Text>Configurações</Text>
                </MenuItem>
              </NextLink>
              <MenuItem display="flex" alignItems="center" onClick={() => signOut()}>
                <Icon as={FaSignOutAlt} h="4" w="4" mr="4"/>
                <Text>Sair</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {children}
      </Flex>
      <Drawer onClose={onClose} isOpen={isOpen} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <Aside />
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

type NavItemProps = {
  currentPath: string;
  href: string;
  icon: IconType;
  title: string;
}

export const NavItem = ({ currentPath, href,  icon, title }: NavItemProps) => {
  const pathNodes = currentPath.split('/').filter(node => node);

  if((href === '/' && currentPath === '/') || pathNodes.includes(href.split('/')[1])) return (
    <NextLink href={href} passHref>
      <Link display="flex" alignItems="center" bg="purple.100" _hover={{ bg: 'purple.200' }} w="100%" p="2" borderRadius="md">
        <Icon as={icon} h="6" w="6" mr="4" color="purple.700" />
        <Text color="purple.700" >{title}</Text>
      </Link>
    </NextLink>
  )

  return (
    <NextLink href={href} passHref>
      <Link display="flex" alignItems="center" _hover={{ bg: 'gray.200' }} w="100%" p="2" borderRadius="md">
        <Icon as={icon} h="6" w="6" mr="4"/>
        <Text>{title}</Text>
      </Link>
    </NextLink>
  )
}

export const Aside = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex as="aside" h="100%" direction="column" w={{base: '100%', lg: '60' }}>
      <Flex h="14" px="4" align="center">
        <Text as="h1" fontSize="2xl" fontWeight="bold">Dashix</Text>
      </Flex>
      <VStack flex="1" spacing="2" align="flex-start" p="4">
        <NavItem href="/" currentPath={router.pathname} icon={FaHome} title="Home"/>
        <NavItem href="/users" currentPath={router.pathname} icon={FaUser} title="Usuários"/>
      </VStack>
      <VStack spacing="2" align="flex-start" p="4">
        <Button w="100%" colorScheme="gray" variant="solid" size="sm" leftIcon={<Icon as={FaExclamationTriangle}/>} onClick={onOpen}>Reportar um problema</Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reportar um problema</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <Textarea id="description" name="description" placeholder="Descriçao" resize="none" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HStack spacing="4">
              <Button variant="ghost" onClick={onClose}>Cancelar</Button>
              <Button colorScheme="purple">
                Enviar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}