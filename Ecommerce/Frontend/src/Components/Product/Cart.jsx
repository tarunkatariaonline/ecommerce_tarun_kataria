import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, HStack,  Stack, Text, Button } from '@chakra-ui/react';
import { setcart, removecart } from '../../Redux/Slice/cartSlice';
import { Link } from 'react-router-dom';
import { setOrderedProduct } from '../../Redux/Slice/orderedProductDetailsSlice';
import useUserDetails from '../../Hooks/useUserDetails';
import EmptyCart from '../EmptyCart';


const Cart = () => {
 const isLogin = useUserDetails()
 console.log(isLogin)
 const dispatch = useDispatch();

  const cartData = useSelector((state => state.cartReducer.cart));
  for(let i =0;i<cartData;i++){
   if( cartData[i].quantity===0){
    dispatch(removecart({
      _id: cartData[i]._id
    }))

   }
  }
  window.localStorage.setItem("cart", JSON.stringify(cartData))

  //   console.log(cartData);
  return (cartData.length === 0) ? <EmptyCart/> : (
    <>
      <Box>
        {cartData.map((item) => {
          return  <HStack key={item._id} w={"100%"} justifyContent={"center"} marginTop={"20px"}   >
            <Stack w={"70%"} minH={["280px", "160px"]} direction={["column-reverse", "row"]} justifyContent={["center", "space-between"]} px={"20px"} alignItems={"center"} bgColor={"purple.300"} borderRadius={"10px"}  >

              <HStack minH={["90px", "150px"]} w={["100%", "60%"]} borderColor={"black"} alignSelf={"center"} >
                <Box >

                  <Text fontSize={["15px", "15px"]}>
                    {item.name}
                  </Text>

                  <Text fontSize={"17px"}>
                    ₹ {item.price}
                  </Text>
                </Box>
              </HStack>
              <HStack minH={["100px", "91px"]} w={["60%", "35%", "15%", "13%"]} mt={["10px!important", "none"]} borderRadius={"2px"} bgImage={item.image} bgSize={"cover"} bgPos={"center"} pos={"relative"}  >
                <Box height={["150px", "145px"]} w={["100%", "100%"]} borderRadius={"0px"} >
                  <HStack height={["150px", "150px"]} w={["100%", "100%"]} justifyContent={"center"} alignItems={"flex-end"}>
                    <HStack h={"30px"} w={"100px"} border={"2px"} borderColor={"green"} borderRadius={"0px"} bgColor={"gray.200"} >
                      <Button size={"sm"} variant={"unstyled"} color={"green"} onClick={() => {

                        dispatch(setcart({
                          _id: item._id,
                          name: item.name,
                          price: item.price,
                          qunatity: 1

                        }))


                      }} >+</Button>
                      <Text color={"green"}>{item.quantity}</Text>
                      <Button size={"sm"} variant={"unstyled"} color={"green"} onClick={() => {

                        dispatch(removecart({
                          _id: item._id
                        }))

                        console.log(cartData)

                      }} >-</Button>
                    </HStack>

                  </HStack>
                </Box>

              </HStack>

            </Stack>
          </HStack>
        })}
      </Box>

      <HStack w={"100%"} justifyContent={"center"} my={"20px"}>
        <HStack w={"70%"} justifyContent={"center"}>
          <Link to={'/order/shippingdetails '}>
            <Button colorScheme="purple" onClick={() => {
              dispatch(setOrderedProduct(cartData))
            }}>Buy Now</Button> </Link></HStack>
      </HStack>
    </>
  )
}

export default Cart