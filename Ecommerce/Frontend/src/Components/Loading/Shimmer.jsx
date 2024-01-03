import React from 'react'
import { HStack } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
const Shimmer = () => {
  return (
    <>

    <HStack h={"100vh"} justifyContent={"center"} alignItems={"center"}>
    <Spinner size={"xl"} color='purple.500'  thickness='4px' h={"100px"} 
    w={"100px"} />
    </HStack>
    </>
  )
}

export default Shimmer