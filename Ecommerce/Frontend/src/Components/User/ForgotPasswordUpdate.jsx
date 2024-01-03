import React, { useState } from 'react'
import { Container,VStack,Heading,Input,Button,Text,useToast} from '@chakra-ui/react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { FORGOT_PASSWORD_UPDATE } from '../Apis/Apis'


const ForgotPasswordUpdate = () => {
  const {token} = useParams()
  const navicate = useNavigate()
  const toast = useToast()
    const [password,setPassword] = useState("")
    const [cpassword,setCpassword] = useState("")


    const updateForgotPasswordApi = async ()=>{
   const res = await fetch(FORGOT_PASSWORD_UPDATE+token,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
      password,
      cpassword
    }),
   
    
   })
    

   const json = await res.json()
   console.log(json)

   if(res.status===406){
    toast({
      title: 'Error',
      description: (json.message),
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
   }else{
    toast({
      title: 'Success',
      description: "Password Updated Successfully",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    navicate('/user/login')
   }

    }
  return (
    <>
     <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
       
       <form onSubmit={(e)=>{
      e.preventDefault()
       }}  >
          <VStack alignItems={"stretch"} spacing={"8"} w={["full","96"]} m={"auto"} my={"16"}>

            <Heading fontSize={"18px"}>Update Password</Heading>

       <Input type={"text"}  value={password} onChange={(e)=>{
        setPassword(e.target.value)
       }}  placeholder={"Enter your New Password"}   border={"1px solid purple"} required />

       <Input type={"text"}  value={cpassword} onChange={(e)=>{
        setCpassword(e.target.value)
       }}  placeholder={"Enter your Confirm Password"}  border={"1px solid purple"} required />

       
    

      

       <Button variant={"solid"} type="submit" onClick={()=>{
        updateForgotPasswordApi()
       }}  alignSelf={"streach"} colorScheme={"purple"} >
       Update Password
       </Button>

      
      

          </VStack>

       </form>
    </Container>
    </>
  )
}

export default ForgotPasswordUpdate