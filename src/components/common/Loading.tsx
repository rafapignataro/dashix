import { FlexProps, Flex, CircularProgress } from "@chakra-ui/react"

export const Loading = ({ size = '50px', ...props }: FlexProps & { size?: string }) => {
  return (
    <Flex flex="1" justify="center" align="center" w="100%" {...props}>
      <CircularProgress isIndeterminate size="100px" color="purple.500"/>
    </Flex>
  )
}