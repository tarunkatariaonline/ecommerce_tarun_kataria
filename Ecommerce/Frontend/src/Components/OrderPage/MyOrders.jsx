import React, { useEffect, useState } from 'react'


import { Box,HStack,Text} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'
import Shimmer from '../Loading/Shimmer';
import EmptyOrder from './EmptyOrder';
import { MY_ORDERS } from '../Apis/Apis';

const MyOrders = () => {

    const [myOrders,setMyOrders] = useState(null)
    const navicate = useNavigate()

    useEffect(()=>{
       fetchMyOrders();
       async function fetchMyOrders(){
        const res =  await fetch(MY_ORDERS,{
            method:"GET",
            headers:{
             "Content-Type":"application/json"
            },
            credentials:"include"
           
        })

        const json =  await res.json()
        console.log(json)

        if(res.status===200){
        setMyOrders(json)

        }else{
          navicate('/user/login')
        }
    }

    },[navicate])

   

    console.log()
  return (!myOrders)?<Shimmer/>: (myOrders.order.length===0)?<EmptyOrder/>:(
  
    <>
    

   
    <Box display={"flex"} flexDir={"column-reverse"} >
      
   
{myOrders.order.map((order)=>{


return <Link  key={order._id}  to={'/order/myorders/'+order._id}>
<HStack w={"100%"} justifyContent={"center"} my={"20px"}>
<HStack px={"20px"} w={["100%","80%"]} border={"1px"} minH={"100px"} borderRadius={"5px"}   css ={':hover{border:1px solid blue}'} justifyContent={"space-between"} cursor={"pointer"}  >
  <Box>
   <Text>
   Order Id : {order._id}
   </Text>
   <Text>
    Items :  {order.orderItems.length}
   </Text >
   <Text fontSize={"13px"}>
    Order Time : {order.createdAt.slice(0,10)}
   </Text >

   <Text fontSize={"16px"} fontWeight={"bold"} color={"green.400"} >
    Grand Total :  ₹ {order.totalPrice}
   </Text >

  
  </Box>

 
  <Text  fontSize={"17px"} color={(order.orderStatus==="Processing")?"red":(order.orderStatus==="Shipped")?"yellow":"green"}  fontFamily={"sans-serif"} fontWeight={"bold"}>
     {order.orderStatus.toUpperCase()}
   </Text>

</HStack>

</HStack>
</Link>
})}
   
    
   
    
 
    

</Box>


    </>
  )
}

export default MyOrders