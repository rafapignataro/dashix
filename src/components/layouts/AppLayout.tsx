import NextLink from 'next/link';
import { Avatar, Button, CircularProgress, Drawer, DrawerContent, DrawerOverlay, Flex, FlexProps, FormControl, FormLabel, HStack, Icon, IconButton, Input, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react"
import { FaArrowLeft, FaBars, FaCog, FaExclamationTriangle, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { useUser } from '../../hooks/useUser';

type AppLayoutProps = {
  title?: string;
  returnPath?: string;
  children: React.ReactNode;
}

export const AppLayout = ({ title, returnPath, children }: AppLayoutProps) => {
  const { user } = useUser();
  const isMobile = useBreakpointValue({ base: true, lg: false,  });
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex h="100vh">
      {!isMobile && <Aside />}
      <Flex as="main" flex="1" direction="column" p="4" w="calc(100vw - var(--chakra-sizes-60))" h="100%" bg="gray.50">
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
            <MenuButton as={Button} bg="transparent" px="0" rightIcon={!isMobile ? <ChevronDownIcon /> : null}>
              <Flex align="center">
                <Avatar src={String(user?.image)} name={String(user?.name)} size="sm" mr={{ base: 0, md:  3 }} />
                {!isMobile && <Text>{String(user?.name)}</Text>}
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
      <Link display="flex" alignItems="center" bg="brand.100" _hover={{ bg: 'brand.200' }} w="100%" p="2" borderRadius="md">
        <Icon as={icon} h="6" w="6" mr="4" color="brand.700" />
        <Text color="brand.700" >{title}</Text>
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
  const { user } = useUser();

  return (
    <Flex as="aside" h="100%" direction="column" w={{ base: '100%', lg: '60' }}>
      <Flex h="14" px="4" align="center">
        <Text as="h1" fontSize="2xl" fontWeight="bold">Dashix</Text>
      </Flex>
      <VStack flex="1" spacing="2" align="flex-start" p="4">
        {['SUPER_ADMIN', 'ADMIN', 'USER'].includes(String(user?.role)) && <NavItem href="/" currentPath={router.pathname} icon={FaHome} title="Home"/>}
        {['SUPER_ADMIN', 'ADMIN'].includes(String(user?.role)) && <NavItem href="/users" currentPath={router.pathname} icon={FaUser} title="Usuários"/>}
        {['SUPER_ADMIN', 'ADMIN', 'USER'].includes(String(user?.role)) && <NavItem href="/partners" currentPath={router.pathname} icon={FaUser} title="Habilitados"/>}
      </VStack>
      <VStack spacing="2" align="flex-start" p="4">
        <Button w="100%" colorScheme="gray" variant="solid" leftIcon={<Icon as={FaExclamationTriangle}/>} onClick={onOpen}>Reportar um problema</Button>
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
              <Button colorScheme="brand">
                Enviar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export const Loading = ({ size = '50px', ...props }: FlexProps & { size?: string }) => {
  return (
    <Flex flex="1" justify="center" align="center" w="100%" {...props}>
      <CircularProgress isIndeterminate size="100px" color="brand.500"/>
    </Flex>
  )
}