import { HStack, Image } from '@chakra-ui/react'
import React from 'react'
import ProdcutNotFoundImage from '../../Images/ProductNot-removebg-preview.png' 

const ProductNotFount = () => {
  return (
    <HStack w={"100%"} h={"80vh"} justifyContent={"center"} alignItems={"center"} >

    <Image w={"500px"} src={ProdcutNotFoundImage}/>

    </HStack>
  )
}

export default ProductNotFount