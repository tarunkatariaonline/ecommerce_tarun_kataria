import React from 'react'
import {VStack,Button,Text,Image} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import pnf from '../Images/error-404-page-not-found-landing-page-concept-for-mobile-and-pc-free-vector-removebg-preview.png'
const PageNotFount = () => {
  return (
    <VStack w={"100%"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
     <Image src={pnf} w={["90%","600px"]} />
     <Text fontSize={"30px"} fontWeight={"semibold"}>
        Page Not Found !
     </Text>
   <Link to={'/'}>   <Button colorScheme='purple'>Go Back</Button></Link>
    </VStack>
  )
}

export default PageNotFount