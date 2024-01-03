import { Stack,HStack,Avatar,Box,Text, Button,useToast } from '@chakra-ui/react'
import React from 'react'
import { Link} from 'react-router-dom'
import UpdateProfile from './UpdateProfile'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useEffect } from 'react'
import Shimmer from '../Loading/Shimmer'
import { ACCOUNT } from '../Apis/Apis'

const Account = () => {
 
  const user = useSelector(state=>state.userReducer.user)
  const updateProfileRe = useSelector(state=>state.updateProfileReducer.updateProfileUsingRedux) 
  const navicate = useNavigate();
  const toast = useToast()

  


 


  useEffect(()=>{
   fetchUserDetails()
   
  },[])
  async function fetchUserDetails(){
    const res = await fetch (ACCOUNT,{
      credentials:"include"
    });

   
    if(res.status===406){
      toast({
        title: 'Error',
        description:"Please Login.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:"bottom-left",
    
      })
      navicate('/user/login')
    }
  }
  
  return  (
   <>{(updateProfileRe || !user)?<Shimmer/>:<HStack justifyContent={"center"} my={"40px"} >
   <Stack w={["100%","50%"]} direction={["column","row"]}  borderRadius={"5px"} alignItems={["center",""]}  justifyContent={"space-between"}  >
   <Avatar m={"20px"} size={["xl","2xl"]} src={user?.avatar?.url}  />\
 
   <Box>
   <HStack mx={"20px"} my={"20px"}> <Text fontWeight={"bold"}  fontSize={"17px"} >Object Id : </Text> <Text fontSize={"17px"} > {user?._id} </Text>  </HStack>
    <HStack mx={"20px"} my={"20px"}> <Text fontWeight={"bold"} fontSize={"17px"} >Name : </Text> <Text fontSize={"17px"} > {user?.name} </Text>  </HStack>
    <HStack mx={"20px"} my={"20px"}> <Text fontWeight={"bold"} fontSize={"17px"} >Phone Number : </Text> <Text fontSize={"17px"} > {user?.phoneno} </Text>  </HStack>
    <HStack mx={"20px"} my={"20px"}> <Text fontWeight={"bold"} fontSize={"17px"} >Email : </Text> <Text fontSize={"17px"} > {user?.email}</Text>  </HStack>
   
   <HStack mx={"20px"} my={"20px"}> <UpdateProfile {...user}/> <Link to={'/user/changepassword'}>
   <Button size={["sm","md"]} colorScheme={"purple"}>Change Password</Button></Link> </HStack>
 
     
   </Box>
   </Stack>
 
   </HStack>}
   
   </>
  )
}

export default Account