import React, { useEffect, useState } from 'react'

import { Box,HStack,Stack,Text,Button, useToast } from '@chakra-ui/react';

import { Select } from '@chakra-ui/react'
import { ALL_ORDERS_ADMIN, ALL_ORDERS_ADMIN_UPDATE } from '../../Apis/Apis';
import { GrShare } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import Shimmer from '../../Loading/Shimmer';


const AllOrdersAdmin = () => {
     const [allOrders,setAllOrders] = useState(null)
     const [status,setStatus] = useState("")
     const [loading,setLoading]= useState(true)
     const toast = useToast()
     
     console.log(status)

    const updateOrder = async (id)=>{

      if(status.length===0){
        
        toast({
          title: 'Error',
          description: "Please Select Order Option !",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position:"bottom-left",
          
        })
      }else{
      setLoading(true)
        console.log(id);
      const res =  await fetch(ALL_ORDERS_ADMIN_UPDATE +id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            status
        })
      })
     
  

      if(res.status!==406){
        toast({
          title: 'Success',
          description: `Order ${status} Successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position:"bottom-left",
          
        })

      }else{
        toast({
          title: 'error',
          description: `Order not updated`,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position:"bottom-left",
          
        })
        setLoading(false)
      }
    }
    setLoading(false)
    setStatus("")
  

     }
     
    const fetchAllOrders = async ()=>{
     const res = await fetch(ALL_ORDERS_ADMIN,{
      credentials:"include"
     })

     const json = await res.json();

     console.log(json)

   
     setAllOrders(json)
     setLoading(false)
    }
    useEffect(()=>{
     fetchAllOrders()
    },[loading])
  return (loading)? <Shimmer/> : (

<>

<AdminNavbar link={"allorders"}/>
    <Box display={"flex"} flexDir={"column-reverse"}>


{ allOrders.orders.map((item)=>{
return <HStack key={item._id} w={"100%"} justifyContent={"center"}  my={"20px"}>
<Stack px={"20px"} w={["100%","80%"]} border={"1px"} minH={"130px"} borderRadius={"5px"}   css ={':hover{border:1px solid blue}'} justifyContent={["center","space-between"]}  cursor={"pointer"} flexDir={["column","row"]}  >
  <Box>
   <Text>
   Order Id : {item._id}
   </Text>
   <Text>
    Items : {item.orderItems.length}  
   </Text >
   <Text fontSize={"13px"}>
    Order Time : {item.createdAt.slice(0,10)}
   </Text >

   <Text fontSize={"16px"} fontWeight={"bold"} color={"green.400"} >
    Grand Total :  ₹ {item.totalPrice}
   </Text >

   {(item.orderStatus==="Delivered")?"":<Text  fontSize={"17px"} color={(item.orderStatus==="Delivered")?"green.400":"red"} fontFamily={"sans-serif"} fontWeight={"bold"}>
     {item.orderStatus.toUpperCase()}
   </Text>}
   
  
  </Box>

 

<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Link to={'/order/myorders/'+item._id}> <Button size={"sm"} mb={"5px"} colorScheme='purple' color={"white"}> <GrShare color="white"  /></Button></Link>
    {(item.orderStatus==="Delivered")?<Text  fontSize={"17px"} color={(item.orderStatus==="Delivered")?"green.400":"red"} fontFamily={"sans-serif"} fontWeight={"bold"}>
     {item.orderStatus.toUpperCase()}
   </Text>: <div> <Select placeholder='Select Delivery Option' onChange={(e)=>{
    setStatus(e.target.value)
    
   }}  w={"150px"}>
   
   {item.orderStatus==="Shipped"?<option value='Delivered'  >Delivered</option>:  <option value='Shipped'  
     >Shipped</option>} 
  
 </Select>
 <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    <Button size={"sm"} w={"80px"}  my={"10px"} colorScheme="purple" onClick={()=>{
    updateOrder(item._id)
  }}>UPDATE</Button>  </Box></div>}

 </Box>

</Stack>

</HStack>
})}

    </Box>
    </>
  )
}

export default AllOrdersAdmin