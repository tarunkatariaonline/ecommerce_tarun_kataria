
import React, { useState } from 'react'
import { HStack, useToast } from '@chakra-ui/react'

import { Container, VStack, Input, Button, Text, Avatar,InputGroup,InputLeftAddon, } from '@chakra-ui/react'
import { Link, redirect } from 'react-router-dom'
import "./style.css"
import axios from 'axios'
import useUserDetails from '../../Hooks/useUserDetails'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../../Redux/Slice/userSlice';
import { setIsAuth } from '../../Redux/Slice/isAuthSlice';
import { useNavigate } from 'react-router-dom'
import Shimmer from '../Loading/Shimmer'
import { SIGNUP } from '../Apis/Apis'
const Signup = () => {
    const toast = useToast()
    const navicate = useNavigate()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
 
    
    const [userData, setUserData] = useState({
        name: "",
        phoneno: "",
        email: "",
        password: "",
        cpassword: ""

    })



    const {name,phoneno,email,password,cpassword} = userData
   const [profilePic,setProfilePic] = useState();
   const [preview,setPreview] = useState('https://cdn.landesa.org/wp-content/uploads/default-user-image.png')

   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(values => ({...values, [name]: value}))
      }


      const uploadProfilePic = (e)=>{
        if(e.target.files[0]){
         console.log(e.target.files[0])
         const file = e.target.files[0]
         const reader = new FileReader()
        
         reader.onload =()=>{
            if(reader.readyState===2){
                setPreview(reader.result)
                setProfilePic(e.target.files[0])
            }
         }

        reader.readAsDataURL(file)
       
        
        }
      }
    

      //userData post api ki call yaha hai------------
      const postUserData=async(e)=>{
        setLoading(true)
        e.preventDefault();
         const formData = new FormData()
         formData.append('name',name)
         formData.append('phoneno',phoneno)
         formData.append('email',email)
         formData.append('password',password)
         formData.append('cpassword',cpassword)
         formData.append('file',profilePic)
      
         try{
        //  const {name,phoneno,email,password,cpassword} = userData
        const res = await axios.post(SIGNUP,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            withCredentials:true
            
       
          })

          console.log(res.data)
          setLoading(false)
          dispatch(setUser(res.data))
          dispatch(setIsAuth(true))
        
          toast({
            title: 'Success',
            description: (res.data.message),
            status: 'success',
            duration: 2000,
            isClosable: true,
            position:"bottom-left",
            
          })

        
        }catch(err){
            setLoading(false)
        
            toast({
                title: 'Error',
                description: (err.response.data.message),
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"bottom-left",
            
              })
        }
    

      }
   

    

    return (
        <>
        {(loading)?<Shimmer/>: <HStack  h={"100vh"} p={"16"} mb={"100px"} justifyContent={"center"}>

<form method="POST" onSubmit={(e)=>{e.preventDefault()}} >


    <VStack alignItems={"stretch"} spacing={"8"} w={["full", "96"]} m={"auto"} my={"16"}>


        <Avatar src={preview} alignSelf={"center"} boxSize={"24"} />
        <Input  type={"file"} id={"uploadUserPic"} onChange={uploadProfilePic} />
        <Input type={"text"} name={"name"}  value={userData.name} placeholder={"Enter your Name"} border={"1px solid purple"} onChange={handleChange} required />
        <Input type={"email"} name={"email"} value={userData.email} placeholder={"Enter your Email"} border={"1px solid purple"} onChange={handleChange} required />
        <InputGroup>
<InputLeftAddon children='+91' />
<Input type={"number"} name={"phoneno"}  min={"10"} max={"10"} value={userData.phoneno} 
        placeholder={"Enter your Mobile Number"} onChange={handleChange} border={"1px solid purple"} required />
</InputGroup>
        
        <Input type={"text"} name={"password"} onChange={handleChange} value={userData.password}  placeholder={"password"} border={"1px solid purple"} required />

      {(password===cpassword)?<Input type={"text"} name={"cpassword"} onChange={handleChange} value={userData.cpassword} placeholder={"confirm password"} border={"1px solid purple"} required />:<Input isInvalid type={"text"} name={"cpassword"} onChange={handleChange} value={userData.cpassword} placeholder={"confirm password"} border={"1px solid purple"} required /> }
      
        

          

    {(!name || !phoneno || !email || !password || !cpassword || (phoneno.length<10) ||  (phoneno.length>10))? <Button variant={"solid"} type={"submit"} alignSelf={"streach"} colorScheme={"purple"}  >
            Sign Up
        </Button>: <Button variant={"solid"} type={"submit"} alignSelf={"streach"} colorScheme={"purple"} onClick={postUserData} >
            Sign Up
        </Button>}   

        <Text textAlign={"right"} >Old user ?</Text>
        <Button variant={"link"} alignSelf={"flex-end"} m={"4px!important"}>
            <Link to="/user/login">Sign in</Link>
        </Button>

    </VStack>

</form>
</HStack>}
           
        </>
    )
}

export default Signup