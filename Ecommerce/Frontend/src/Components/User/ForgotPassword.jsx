import React, { useState } from 'react'
import { Container,VStack,Heading,Input,Button,Text,useToast} from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD } from '../Apis/Apis'
import Shimmer from '../Loading/Shimmer'

const ForgotPassword = () => {

const [email,setEmail] = useState("")
const toast = useToast()
const [loading,setLoading] = useState(false)
const navicate = useNavigate()



const forgotPasswordApi = async()=>{
  const res = await fetch(FORGOT_PASSWORD,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      
    },
    credentials:"include",
   
    body:JSON.stringify({
      email
    })
  })

  const json = await res.json()
   console.log(json)
   setLoading(false)
   if(res.status===406){
    toast({
      title: 'Error',
      description: "Please Register Your Account",
      status: 'error',
      duration: 9000,
      isClosable: true,
      position:"bottom-left"
    })

    navicate('/user/signup')
   }else{
    toast({
      title: 'Success',
      description: "Mail Sended Successfully.",
      status: 'success',
      duration: 4000,
      isClosable: true,
      position:"bottom-left"
    })
   }


}

if(loading){
  return <Shimmer/>
}
  return (
    <>
    
    <Container minW={["100%","70%"]} h={"100vh"} p={"16"}>
       
       <form onSubmit={(e)=>{
      e.preventDefault()
      forgotPasswordApi()
      setLoading(true)
       }}  >
          <VStack alignItems={"stretch"} spacing={"8"} w={["100%","96"]} m={"auto"} my={"16"}>

            <Heading fontSize={"18px"}>Forgot Password</Heading>

       <Input type={"email"}   placeholder={"Enter your Email"} value={email} onChange={(e)=>{
        setEmail(e.target.value)
       }} border={"1px solid purple"} required />
    

      

       <Button variant={"solid"} type="submit"  alignSelf={"streach"} colorScheme={"purple"}>
       Send Mail
       </Button>

      
      

          </VStack>

       </form>
    </Container>
    
    </>
  )
}

export default ForgotPassword