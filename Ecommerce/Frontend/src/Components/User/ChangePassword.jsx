import React, { useState } from 'react'
import { Container,VStack,Heading,Input,Button,Text,useToast} from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom'
import { CHANGE_PASSWORD } from '../Apis/Apis';
const ChangePassword = () => {


    const [oldpassword,setOldPassword] = useState("");
    const [password,setPassword] = useState("");

    const [cpassword,setCpassword]  = useState("");
    const toast = useToast()
    const navicate = useNavigate()
  const changePasswordApi = async(e)=>{
  e.preventDefault();
   
  const res = await fetch(CHANGE_PASSWORD,{
    method:'PUT',
    headers:{
        'Content-Type':"application/json"
    },
    credentials:"include",
  
    body:JSON.stringify({
        oldpassword,
        password,
        cpassword
    })
  })

  const json = await res.json()
  console.log(json)
  
  
  if(res.status===406){
    toast({
        title: 'Error',
        description: json.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:"bottom-left",
    
      })
   }else if(res.status===201 || res.status===200){
    toast({
        title: 'Success',
        description: json.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:"bottom-left",
        
      })


      navicate('/')
   }
  }


  return (
    <>
    <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
       
       <form method='POST' >
          <VStack alignItems={"stretch"} spacing={"8"} w={["full","96"]} m={"auto"} my={"16"}>

            <Heading fontSize={"25px"} >Change Password</Heading>

       <Input type={"email"} value= {oldpassword}  onChange={(e)=>{
        setOldPassword(e.target.value)
       }}
        placeholder={"Enter Old Password"} border={"1px solid purple"} required/>
       <Input type={"text"} value={password} onChange={(e)=>{
           setPassword(e.target.value)
       }} 
        placeholder={"password"} border={"1px solid purple"} required/>

<Input type={"text"} value={cpassword} onChange={(e)=>{
 setCpassword(e.target.value)
}}
placeholder={"cpassword"} border={"1px solid purple"} required/>


       

       <Button variant={"solid"} type={"submit"} onClick={changePasswordApi} alignSelf={"streach"} colorScheme={"purple"}>
       Change Password
       </Button>

      
          </VStack>

       </form>
    </Container>
    </>
  )
}

export default ChangePassword