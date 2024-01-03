import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Slice/userSlice';
import Shimmer from '../Loading/Shimmer';
import { LOGOUT } from '../Apis/Apis';

const Logout = () => {
    const navicate = useNavigate();
    const toast = useToast()
    const dispatch  = useDispatch();
  
    useEffect(()=>{
        async function logoutFunction(){
            const res = await fetch(LOGOUT,{
              credentials:"include"
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
                navicate('/user/login')
            }else if (res.status===200){
                toast({
                    title: 'Success',
                    description: json.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:"bottom-left",
                
                  })
                  dispatch(setUser(null))
                navicate('/')
            }
        }
    logoutFunction()
    },[dispatch,navicate,toast])
  return (
    <>
    <Shimmer/>
    </>
  )
}

export default Logout