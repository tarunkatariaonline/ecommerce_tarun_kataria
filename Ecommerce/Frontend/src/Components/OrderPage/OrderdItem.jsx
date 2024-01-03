import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


import { Box,HStack,Stack,Text} from '@chakra-ui/react';
import { useState } from 'react';
import Shimmer from '../Loading/Shimmer';
import { ORDERD_ITEM } from '../Apis/Apis';
const OrderdItem = () => {
    const {id} = useParams()

     const [singleProduct,setSingleProduct] = useState(null)

    useEffect(()=>{
        const fetchMyOrderSingle = async ()=>{
            const res = await fetch(ORDERD_ITEM+id,{
              credentials:"include"
            })
            const json = await res.json()
            console.log(json)
            setSingleProduct(json)
        }
        fetchMyOrderSingle()

    },[id])
  return  (!singleProduct)? <Shimmer/> :(
    <>

          <Box marginX={["20px","25px"]} mt={"25px"} >
            <Text fontSize={"23px"} fontWeight={"bold"}>SHIPPING DETAILS : </Text>
            <Text>Address : {singleProduct.order.shippingInfo?.address} </Text>
            <Text>City : {singleProduct.order.shippingInfo?.city} </Text>
            <Text>State : {singleProduct.order.shippingInfo?.state}</Text>
            <Text>Country : {singleProduct.order.shippingInfo?.country}</Text>
            <Text>Post Code : {singleProduct.order.shippingInfo?.pinCode}</Text>
          </Box>

    {singleProduct.order.orderItems.map((item)=>{
     return <HStack key={item._id} w={"100%"} justifyContent={"center"} marginTop={"20px"}   >
     <Stack  w={"70%"} minH={["280px","160px"]} direction={["column-reverse","row"]} border={"1px"} justifyContent={["center","space-between"]} px={"20px"} borderColor={"red"}  alignItems={"center"}      >
          
        <HStack minH={["90px","150px"]} w={["100%","60%"]} my={"10px"}   borderColor={"black"}  alignSelf={"center"} >
          <Box >
        
           <Text fontSize={["17px","17px"]} fontFamily={"sans-serif"}  >
             {item.name}
           </Text>
          
           <Text fontSize={"13px"}  fontWeight={"semibold"} color={"blue"} >
           Quantity :{item.quantity}
           </Text>
           <Text fontSize={"17px"} fontWeight={"bold"} color={"green"} >
           ₹ {item.price}
           </Text>

           <Text fontSize={"17px"} fontWeight={"bold"} color={"green"} >
          {item.quantity} X {item.price} : ₹ {item.quantity*item.price}
           </Text>
           
 
          
           </Box>
        </HStack>
        <HStack minH={["100px","91px"]} w={["60%","35%","15%","13%"]} mt={["10px!important","none"]}    borderRadius={"2px"} bgImage={item.image}  bgSize={"cover"} bgPos={"center"} pos={"relative"}  >
          <Box height={["150px","145px"]} w={["100%","100%"]}    borderRadius={"0px"} >
           <HStack height={["150px","150px"]} w={["100%","100%"]}  justifyContent={"center"} alignItems={"flex-end"}>
          
           
          </HStack>
          </Box>
             
        </HStack>
 
      </Stack>
      </HStack>
    })}
     
  <HStack justifyContent={"center"} my={"20px"} >
    <Box w={["90%","30%"]} border={"1px"} borderRadius={"10px"} >

        <HStack justifyContent={"center"} borderBottom={"1px"}  >
            <Text>Order Summary </Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"} borderBottom={"1px"} px={"10px"}>
            <Text>
                Total :
            </Text>
            <Text>
            ₹   {singleProduct.order.itemsPrice}
            </Text>
        </HStack>

        <HStack w={"100%"} justifyContent={"space-between"} borderBottom={"1px"} px={"10px"}>
            <Text>
             Tax (8%) :
            </Text>
            <Text>
            ₹  {singleProduct.order.taxPrice}
            </Text>
        </HStack>

        <HStack w={"100%"} justifyContent={"space-between"} borderBottom={"1px"} px={"10px"} >
            <Text>
              Shipping Price : 
            </Text>
            <Text>
            ₹  {singleProduct.order.shippingPrice}
            </Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"} px={"10px"} >
            <Text>
             Grand Total :
            </Text>
            <Text fontWeight={"bold"} color={"red"}  >
            ₹  {singleProduct.order.totalPrice}
            </Text>
        </HStack>
    </Box>
    </HStack>
    </>
  )
}

export default OrderdItem