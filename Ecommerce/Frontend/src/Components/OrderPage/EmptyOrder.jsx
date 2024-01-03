import { HStack,Box, Text, Button } from '@chakra-ui/react'
import React from 'react'
import {AiOutlineCodeSandbox} from 'react-icons/ai'
import { Link } from 'react-router-dom'


const EmptyOrder = () => {
  return (
   <HStack w={"100%"} h={"100vh"} justifyContent={"center"} alignItems={"center"}  >
     
     <Box display={"flex"} justifyContent={"center"} color={"purple.500"} flexDir={"column"} alignItems={"center"}>
        <AiOutlineCodeSandbox size={"100px"}/>
         <Text my={"10px"} fontSize={"20px"} >Orders Not Found !</Text>
       <Link to={'/'}>  <Button color={"purple.500"}  >Continue Shopping</Button></Link>
     </Box>

   </HStack>
  )
}

export default EmptyOrder