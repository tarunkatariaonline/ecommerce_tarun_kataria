import React from 'react'
import { Button } from '@chakra-ui/react'
import {MdChat} from 'react-icons/md'
import { useSelector,useDispatch } from 'react-redux' 
import { setChatBot } from '../../Redux/Slice/showChatBotSlice'


const ChatBotBtn = () => {
    const dispatch = useDispatch()
  const chatBot = useSelector((state => state.showChatBotReducer.chatBot));
   
  console.log(chatBot)
  return (
  <>
   <Button onClick={()=>{
    if(chatBot){
        dispatch(setChatBot(false))
    }else{
        dispatch(setChatBot(true))
    }
   }} pos={"fixed"} variant={"unstyled"} px={"15px"} borderTopRadius={"10px"} borderRightRadius={"10px"} borderBottomLeftRadius={"0px"} bgColor={"purple.500"} color={"white"} bottom={"10"}  right={"10px"} > <MdChat/>  </Button>
  </>
  )
}

export default ChatBotBtn