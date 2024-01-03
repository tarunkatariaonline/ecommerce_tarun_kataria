import React, { useState } from 'react'
import { Container,VStack,Heading,Input,Button,Text,useToast} from '@chakra-ui/react'
import { Link,redirect,useNavigate } from 'react-router-dom'
import useUserDetails from '../../Hooks/useUserDetails';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../../Redux/Slice/userSlice';
import { setIsAuth } from '../../Redux/Slice/isAuthSlice';
import Shimmer from '../Loading/Shimmer';
import { LOGIN } from '../Apis/Apis';
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const toast = useToast()
    const navicate = useNavigate()
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const userData = useSelector(state=>state.userReducer.user)



  
   


    const signInUser = async (e)=>{
      setLoading(true)
        e.preventDefault()
     
        const res = await fetch(LOGIN,{
            method:"POST",
         
           
            headers:{
                "Content-Type": "application/json",
            },
            credentials:"include",
            body: JSON.stringify({
              
                email,
                password,
                
            }), 

        })
        const json = await res.json();
        console.log(json.message)
        const message = json.message
        if(res.status===406){
          setLoading(false)
         toast({
             title: 'Error',
             description: message,
             status: 'error',
             duration: 2000,
             isClosable: true,
             position:"bottom-left",
         
           })
        }else if(res.status===201 || res.status===200){
          dispatch(setUser(json))
          dispatch(setIsAuth(true))
          
         toast({
             title: 'Success',
             description: message,
             status: 'success',
             duration: 2000,
             isClosable: true,
             position:"bottom-left",
             
           })
            setLoading(false)

           navicate('/')
        }
    }

   
  return (

    <>
    {(loading)?<Shimmer/>: <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
       
       <form method='POST' onSubmit={(e)=>e.preventDefault()} >
          <VStack alignItems={"stretch"} spacing={"8"} w={["full","96"]} m={"auto"} my={"16"}>

            <Heading>Welcome Back</Heading>

       <Input type={"email"} value= {email}  onChange={(e)=>{
        setEmail(e.target.value)
       }} placeholder={"Enter your Email"} border={"1px solid purple"} required/>
       <Input type={"password"} value={password} onChange={(e)=>{
        setPassword(e.target.value)
       }} placeholder={"password"} border={"1px solid purple"} required/>


       <Button variant={"link"} alignSelf={"flex-end"}>
        <Link to="/user/forgotpassword">Forgot Password</Link>
       </Button>

     {(!email || (!password))?<Button variant={"solid"} type={"submit"} alignSelf={"streach"} colorScheme={"purple"}>
      Sign In
       </Button>:<Button variant={"solid"} type={"submit"} onClick={signInUser} alignSelf={"streach"} colorScheme={"purple"}>
      Sign In
       </Button>}  

       <Text textAlign={"right"} >New user ?</Text>
       <Button variant={"link"} alignSelf={"flex-end"}>
        <Link to="/user/signup">Sign Up</Link>
       </Button>

          </VStack>

       </form>
    </Container>}
   
    </>
  )
}

export default Login