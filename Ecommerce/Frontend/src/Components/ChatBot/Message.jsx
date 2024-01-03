import React from 'react'
import { Box, Button, HStack,Input,Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Avatar } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
const Message = ({type,message}) => {

  return (
   <>

 {(type==="ai")?<HStack w={"100%"}  minH={"40px"} mt={"3px"}  >
        
        <Avatar name='As I' size={"xs"} alignSelf={"flex-end"} ml={"5px"} />
        
        
        <Box maxW={"190px"} bgColor={"gray.500"} px={"12px"} py={"3px"} borderTopRadius={"10px"} borderRightRadius={"5px"} color={"white"} fontSize={"13px"} > 
       {message}</Box>
       </HStack>
    : <HStack w={"100%"}  minH={"40px"} mt={"3px"}justifyContent={"flex-end"}  >
        
        
        
        
    <Box maxW={"190px"} bgColor={"purple.500"} px={"12px"} py={"3px"}  borderTopRadius={"10px"} borderLeftRadius={"5px"} color={"white"} fontSize={"13px"} > 
   {message}</Box>

   <Avatar name='m e' size={"xs"} alignSelf={"flex-end"} mx={"5px!important"} />

   </HStack>} 
   </>
  )
}

export default Message