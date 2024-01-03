import React from 'react'
import { VStack,Text,Image,Button} from '@chakra-ui/react'
import CartEmpty from '../Images/dCdflKN.png'
import { Link } from 'react-router-dom'
const EmptyCart = () => {
  return (
    <>
    <VStack w={"100%"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>

        <Image  src={CartEmpty} w={["100px","100px"]} />
        <Text fontSize={["18px","25px"]}> Your Cart is Empty !</Text>
   <Link to={'/'}> <Button color={"purple.500"} variant={"solid"}>Continue Shopping</Button></Link>


    </VStack>
    </>
  )
}

export default EmptyCart