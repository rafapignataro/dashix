import NextLink from 'next/link';
import { Avatar, Button, CircularProgress, Drawer, DrawerContent, DrawerOverlay, Flex, FlexProps, FormControl, FormLabel, HStack, Icon, IconButton, Input, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, Textarea, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react"
import { FaArrowLeft, FaBars, FaCog, FaExclamationTriangle, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import UserProvider, { useUser } from '../../hooks/useUser';
import { useEffect, useMemo, useState } from 'react';

type AppLayoutProps = {
  title?: string;
  returnPath?: string;
  children: React.ReactNode;
}

export const AppLayout = ({ title, returnPath, children }: AppLayoutProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false,  });
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <UserProvider>
      <Flex h="100vh">
        {!isMobile && <Aside />}
        <Main returnPath={returnPath} title={title} openDrawer={onOpen}>
          {children}
        </Main>
        <Drawer onClose={onClose} isOpen={isOpen} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <Aside />
          </DrawerContent>
        </Drawer>
      </Flex>
    </UserProvider>
  )
}

type MainProps = {
  title?: string;
  returnPath?: string;
  openDrawer: () => void;
  children: React.ReactNode;
}

const Main = ({ title, returnPath, openDrawer, children }: MainProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false,  });
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`)
      setLoading(true);
    }

    const handleStop = () => {
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  const Header = useMemo(() => (
    <Flex as="header" h="8" align="center" justify="space-between" mb="6">
      <Flex align="center">
        {isMobile && (
          <IconButton 
            variant="link" 
            size="lg" 
            icon={<Icon as={FaBars} h="6" w="6" />} 
            aria-label="Open drawer button" 
            onClick={openDrawer}
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
        <MenuButton as={Button} bg="transparent" px={{ base: 0, md: 1 }} rightIcon={!isMobile ? <ChevronDownIcon /> : null}>
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
  ), [isMobile])

  return (
    <Flex as="main" flex="1" direction="column" p="4" w="calc(100vw - var(--chakra-sizes-60))" h="100%" bg="gray.50" position="relative">
      {loading && <Progress value={80} isIndeterminate  size="sm" colorScheme="brand" position="absolute" top="0" left="0" w="100%" />}
      {Header}
      {children}
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
      <Button as={'a'} colorScheme="gray" w="100%" bg="gray.200" justifyContent="flex-start" leftIcon={<Icon as={icon} h="5" w="5" mr="4"/>}>
        {title}
      </Button>
    </NextLink>
  )

  return (
    <NextLink href={href} passHref>
      <Button as={'a'} variant="ghost" w="100%" justifyContent="flex-start" leftIcon={<Icon as={icon} h="5" w="5" mr="4" color="gray.500"/>}>
        {title}
      </Button>
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
      <VStack flex="1" spacing="4" align="flex-start" p="4">
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