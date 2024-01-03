import React, { useEffect } from 'react'
import { HStack, Image, Text,Box, Stack, Button, Avatar } from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

import {MdDelete} from 'react-icons/md'
import DeleteUser from './DeleteUser'
import UpdateUserRole from './UpdateUserRole'
const UserModal = ({user}) => {

  return (
   <>
   <HStack  h={"100px"}  w={"100%"}  borderBottom={"1px"}  justifyContent={"space-around"} >
     
     <HStack  h={"100px"} borderRight={"1px"}  >
     {(!user?.avatar?.url)?<Avatar name={user.name} w={"80px"} h={"80px"} marginRight={"10px"} />:<Avatar src={user?.avatar?.url} marginRight={"10px"}  borderRadius={"60%"} w={"80px"} h={"80px"} />}   
     </HStack>
      
      <HStack  w={["120px","300px"]}  h={"full"} borderRight={"1px"} overflowX={["scroll","hidden"]}  justifyContent={["flex-start","center"]} >
        <Text>{user.email}</Text>
      </HStack>
    
      <HStack  w={["120px","400px"]} h={"full"} borderRight={"1px"}  overflowX={["scroll","hidden"]}  justifyContent={["flex-start","center"]}  display={["none","flex"]} >
        <Text >{user._id}</Text>
      </HStack>
    
      <HStack  w={["60px","100px"]} h={"full"} borderRight={"1px"}  overflowX={["scroll","hidden"]}  justifyContent={["flex-start","center"]}   >
        <Text color={(!user.isAdmin)?"black":"red"} fontWeight={"semibold"} >{(!user.isAdmin)?"User":"Admin"}</Text>
      </HStack>
    
      <HStack  w={["100px","250px"]}  h={"full"}  overflowX={["scroll","hidden"]}  justifyContent={["flex-start","center"]} borderRight={"1px"} >
        <Text >{user.name}</Text>
      </HStack>
    
      <Stack direction={["column","row"]}  marginRight={"10px!important"}   >
       <DeleteUser id={user?._id} />
       <UpdateUserRole id={user?._id} isAdmin={user?.isAdmin}/>
    
      
      
      
     
    
      </Stack>
    
    </HStack>
   </>
  )
}

export default UserModal