import { Box, Button, HStack, Text,useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { ORDER_NOW, ROZER_PAY_KEY, ROZER_PAY_ORDER, ROZER_PAY_PAYMENT_VARIFICATION } from '../Apis/Apis'

const OrderNow = () => {

    const navicate = useNavigate()
    const toast = useToast()
    const orderedProduct = useSelector((state) => state.orderedProductDetailsReducer.orderedProduct)

    const shippingDetails = useSelector((state) => state.shippingInfoReducer.shippingInfo)

    console.log(orderedProduct)
    let total =0;
    for(let i =0;i<orderedProduct.length;i++){
        const price = Number(orderedProduct[i].price)
        const quantity = Number(orderedProduct[i].quantity)
        total+= (price*quantity) 
    }


    let taxPrice = (total*8)/100
    let shippingPrice = 40
    if(total>=500){
        shippingPrice=0
    }

    let totalPrice =( taxPrice+shippingPrice+total)
    const getRazorPayKey = async()=>{
        const res = await fetch(ROZER_PAY_KEY,{
          method:'GET',
           headers:{
            'Content-Type':'application/json'
          },
          credentials:"include"
        })
        const json = await res.json()
        const key = json.key;
        return key;
      }
      const createRazorPayOrder = async()=>{
       const res = await fetch(ROZER_PAY_ORDER,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
       
        body:JSON.stringify({
          amount:totalPrice
        })
  
       })
       const json = await res.json()
       console.log(json)
       return json.order
      }
  
      const createRazorPayPayment = async()=>{
      const key = await getRazorPayKey()
      const order = await createRazorPayOrder()
     console.log(key,order.id)
  
    const options ={
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Tarun Kataria",
      description: "Pay now",
      image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      order_id: order.id,
      // callback_url: "http://localhost:4000/api/v1/razorpay/paymentvarification",
      handler: async function (response){
  
        const res = await fetch(ROZER_PAY_PAYMENT_VARIFICATION,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({
           response
          })
        })
        const json = await res.json()
        console.log(json)

        if(json.success){
            const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = response
            const paymentInfo = {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                
            }

           
        const res = await fetch(ORDER_NOW,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
           
            body:JSON.stringify({
              paymentInfo,
              shippingInfo:shippingDetails,
              orderItems:orderedProduct,
              itemsPrice:total,
              taxPrice,
              shippingPrice,
              totalPrice

             
            })
        })

        const json = await res.json()
        console.log(json)

        if(res.status===406){
            toast({
                title: 'Error',
                description: json.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"bottom-left",
            
              })
           }else if(res.status===201 || res.status===200){
            toast({
                title: 'Success',
                description: json.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom-left",
                
              })
   
   
              navicate('/')
           }

               }
        
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
    },
      prefill: {
        name: "Tarun Kataria",
        email: "gaurav.kumar@gmail.com",
        contact: "9999999999"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#9951F0"
      }
    }
  
    if(order){
    const razor =  new window.Razorpay(options);
   
    
        razor.open();
    }
   
  
      }
  return (
    <>
    
    
    <Box  margin={["5px","20px"]} >
        <Text fontSize={"30px"} fontWeight={"semibold"}>Shipping details :</Text>
        <Text > Address : {shippingDetails.address}</Text>
        <Text> City: {shippingDetails.city}</Text>
        <Text> State : {shippingDetails.state}</Text>
        <Text> Country : {shippingDetails.country}</Text>
        <Text> Pincode : {shippingDetails.pinCode}</Text>
        <Text> Phone Number : {shippingDetails.phoneNo}</Text>
    </Box>
    <Box display={"flex"} w={"100%"} justifyContent={"center"} flexDir={"column"}  alignItems={"center"}  >

    {/* bgColor={"#F1F3EF"} */}
        <HStack border={"1px"}  w={["100%","80%"]}  >
         <HStack w={"100%"} h={"40px"}>
        <HStack w={["40%","40%"]} flexWrap={"wrap"}  h={"40px"} border={"1px"} margin={"0px!important"} justifyContent={"center"}  >
            <Text margin={"10px"}>Product Name</Text>
        </HStack>

        <HStack w={["20%","20%"]} flexWrap={"wrap"}  h={"40px"} border={"1px"}  margin={"0px!important"} justifyContent={"center"} >
            <Text  margin={"10px"}>Quantity</Text>
        </HStack>

        <HStack w={["20%","20%"]}  justifyContent={"center"} flexWrap={"wrap"}  h={"40px"} border={"1px"}  margin={"0px!important"}>
            <Text  margin={"10px"}>Price</Text>
        </HStack>

        <HStack w={["20%","20%"]} justifyContent={"center"}  flexWrap={"wrap"}  h={"40px"} border={"1px"}  margin={"0px!important"}>
            <Text  margin={"10px"}>Amount</Text>
        </HStack>

        </HStack>
        
        </HStack>

{orderedProduct.map((item)=>{
    return <HStack key={item._id} border={"1px"} borderTop={"0px"}  w={["100%","80%"]}  >
    <HStack w={"100%"} minH={"60px"} alignItems={"flex-start"} >
   <HStack w={["40%","40%"]} flexWrap={"wrap"}  minH={"60px"}  margin={"0px!important"} justifyContent={"center"} alignItems={"flex-start"}   >
       <Text m={"10px"}>{item?.name}

       </Text>
   </HStack>

   <HStack w={["20%","20%"]} flexWrap={"wrap"}  margin={"0px!important"} justifyContent={"center"} minH={"60px"}  >
       <Text m={"10px"} >{item.quantity}</Text>
   </HStack>

   <HStack w={["20%","20%"]}  justifyContent={"center"} flexWrap={"wrap"}  h={"60px"}   margin={"0px!important"}   >
       <Text m={"10px"}>₹ {item.price}</Text>
   </HStack>

   <HStack w={["20%","20%"]} justifyContent={"center"}  flexWrap={"wrap"}  h={"60px"}  margin={"0px!important"}  >
       <Text m={"10px"}>₹ {  Number(item.quantity)*Number(item.price)}</Text>
   </HStack>

   </HStack>
   
   </HStack>
})}
        


        
       
        <HStack w={["100%","80%"]} border={"1px"}  >
           
           <Box>

           <Text m={"10px"}>Total : ₹ {total} </Text>
           <Text m={"10px"}>Shipping Price : ₹ {shippingPrice} </Text>
           <Text m={"10px"}>Tax (8%) : ₹ {taxPrice} </Text>
           <Text m={"10px"} color={"red"}>Total Price : ₹ {totalPrice} </Text>
           </Box>
          
           

        </HStack>
 

        <HStack w={"80%"} marginTop={"10px"} > <Button w={"full"} colorScheme="purple" onClick={createRazorPayPayment} > Order Now </Button></HStack>
    </Box>


    
    </>
  )
}

export default OrderNow