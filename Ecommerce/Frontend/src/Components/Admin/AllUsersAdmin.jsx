import { HStack, Text, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import UserModal from './UserModal'
import AdminNavbar from './AdminNavbar'
import Shimmer from '../Loading/Shimmer'
import { ALL_USERS_ADMIN } from '../Apis/Apis'
const AllUsersAdmin = () => {

  const updateAllUsersAdminRd = useSelector(state=>state.updateAllUsersAdminReducer.updateAllUsersAdminUsingRedux)
    const [users,setUsers] = useState()
    useEffect(()=>{
       fetchAllUsersDataAdmin()
    },[updateAllUsersAdminRd])
    const fetchAllUsersDataAdmin = async()=>{
     const data = await fetch(ALL_USERS_ADMIN,{
        method:"GET",
        headers:{
            "Contant-type":"application/json"
        },
        credentials:"include"
  
     })
     const json = await data.json();
     
     console.log(json?.users)
     setUsers(json?.users)
    }

  return (!users || updateAllUsersAdminRd)?<Shimmer/>: (
    <>
 
 <AdminNavbar link={"allusers"}/>

    <HStack  w={"100%"} marginTop={"20px"}  justifyContent={"space-around"} borderBottom={"1px"} >
     
     <HStack   marginLeft={"10px!important"} marginRight={"10px"} w={"70px"}  >
       <Text>ProfilePic</Text>
     </HStack>
      
      <HStack  w={["120px","300px"]} justifyContent={"center"} h={"full"}  overflowX={["scroll","hidden"]}  >
        <Text>User's Email</Text>
      </HStack>

      <HStack  w={["120px","300px"]}  display={["none","flex"]} justifyContent={"center"} h={"full"}  overflowX={["scroll","hidden"]}  >
        <Text >Object Id</Text>
      </HStack>

      <HStack  w={["200px","100px"]} justifyContent={"flex-end"} marginLeft={"5px!important"} h={"full"}  overflowX={["scroll","hidden"]}  >
        <Text marginLeft={"10px"} >Role</Text>
      </HStack>


      <HStack  w={["250px"]} h={"full"}  overflowX={["scroll","hidden"]}  justifyContent={"center"} >
        <Text >Name</Text>
      </HStack>

      <Stack direction={["column","row"]}  marginRight={["0px!important","23px!important"]}   >
      
      <Text>Delete/ Edit</Text>
      
       

      </Stack>

    </HStack>

   

    
{users.map((user)=>{
  return <UserModal key={user._id} user={user} />
})}



    
    </>
  )
}

export default AllUsersAdmin