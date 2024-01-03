import React, { useState } from 'react'
import { Box, Button, HStack,Input,Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux';

import { MdSend } from 'react-icons/md';
import Message from './Message';
import { useDispatch } from 'react-redux';
import { getchatBotChats } from '../../Redux/Slice/ChatBotChatsSlice';
import { setChatBot } from '../../Redux/Slice/showChatBotSlice';


const ChatBotBox = () => {
const dispatch = useDispatch()
    const chatBot = useSelector((state => state.showChatBotReducer.chatBot));
    const chats = useSelector((state => state.chatBotChatsReducer.chats));
    console.log(chats)
    const [chat,setChat] = useState("")
    
   async  function fetchChatBotRes (){
    const res = await fetch('',{

    })
    const json = await res.json()
    console.log("hello")
   } 

    if(!chatBot){
        return ;
    }
  return (
      <Box w={"300px"} boxShadow={"dark-lg"} 
    
       bgColor={"white"} borderRadius={"10px"} pos={"fixed"}  bottom={"24"} right={"40px"}  h={"400px"}>
        <HStack w={"100%"} bgColor={"purple.500"} justifyContent={"center"} h={"45px"} borderTopRadius={"10px"} >
      
       <Text ml={"0px!important"} color={"white"} fontSize={"18px"} fontWeight={"bold"} >Chatbot</Text>
        </HStack>

    
    <Box w={"full"} h={"305px"} overflowY={"auto"}>


    <Message type={"ai"} message={"How can i help you ?"}/>
{chats.map((item)=>{
  return <Message key={item?.message} type={item?.type} message={item?.message}/>
})}
  
 

   

   
    </Box>





   {/* message*/ }

  

        <form onSubmit={(e)=>{
                e.preventDefault()
               
                dispatch(getchatBotChats({
                  message:chat,
                  type:"me"
                }))

                dispatch(getchatBotChats({
                  message:"How can i help you ?",
                  type:"ai"
                }))

               
            }}>
        <HStack w={"100%"} h={"33px"} justifyContent={"center"}   mt={"10px"} >
          
             
             <HStack w={"97%"}>
             <Input w={"100%"} h={"32px"} value={chat}  onChange={(e)=>{
             setChat(e.target.value)
             }} variant={"unstyled"} border={"1px solid"} borderColor={"purple.400"} borderRadius={"0px"} />

             <Button size={"sm"}  mx={"0px!important"} borderRadius={"0px"} type="submit" bgColor={"purple.400"} color={"white"}> <MdSend/> </Button>

             </HStack>
           
        </HStack>
        </form>

    </Box>
  )
}

export default ChatBotBox