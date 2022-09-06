import { Flex } from "@chakra-ui/react"
import { useRouter } from 'next/router';

type AuthLayoutProps = {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();

  return (
    <Flex h="100vh" justify="center" align="center">
      <Flex direction="column" w={{ base: '100%', md: '350px' }} px="4">
        {children}
      </Flex>
    </Flex>
  )
}