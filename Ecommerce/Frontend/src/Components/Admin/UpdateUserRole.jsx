import React, { useState } from 'react'
import { UPDATE_USER_ROLE } from '../Apis/Apis'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,Button
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import { Select } from '@chakra-ui/react'
  import { updateAllUsersAdminReduxFunc } from '../../Redux/Slice/updateAllUsersAdminSlice'

  import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
  import { useDispatch } from 'react-redux'


const UpdateUserRole = ({id,isAdmin}) => {
    const [role,setRole] = useState("")
    const dispatch  = useDispatch()

     
  const toast = useToast()

    const updateUserRoleApi = async()=>{
      dispatch(updateAllUsersAdminReduxFunc(true))
     const res = await fetch(UPDATE_USER_ROLE,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
       credentials:"include",
        body:JSON.stringify({
            role,
            id
        })
     })
     const json = await res.json()
     console.log(json)
     if(res.status===201||res.status===200){
        toast({
            title: json.message,
            
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
       }else{
        toast({
            title: json.message,
            
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
       }
       dispatch(updateAllUsersAdminReduxFunc(false))
    }
  return (
    <>
    
    <Popover>
  <PopoverTrigger>
  <Button size={["sm","md"]} color={"blue.500"}  ><AiFillEdit   /> </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to change user role
    <Select placeholder={(isAdmin)?"Admin":"User"} onChange={(e)=>{
    setRole(Number(e.target.value))
    }} >
   {(isAdmin)?<option  value="0" >User</option>:<option value="1">Admin</option>} 
  
 
  
</Select>

  <Button w={"full"} colorScheme={"purple"} marginTop={"5px"} onClick={updateUserRoleApi}>Update Role</Button>
    </PopoverBody>
    
  </PopoverContent>
</Popover>
    </>
  )
}

export default UpdateUserRole