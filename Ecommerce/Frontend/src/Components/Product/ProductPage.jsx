import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom'
import { Box, Button, HStack,Text} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'


import ProductReview from './ProductReview';
import { setOrderedProduct } from '../../Redux/Slice/orderedProductDetailsSlice';
import { setcart } from '../../Redux/Slice/cartSlice';
import Shimmer from '../Loading/Shimmer';
import { PRODUCT_PAGE } from '../Apis/Apis';

const Product = () => {
    const params = useParams();
    const updateProductRe = useSelector(state=>state.updateProductReducer.updateProductUsingRedux)
    
    const cartOrders = useSelector((state)=>state.cartReducer.cart)
    window.localStorage.setItem("cart",JSON.stringify(cartOrders))
  

    const item = cartOrders.find((item)=>item._id===params.id)

    console.log(cartOrders)
   
  const {id} = params
    
    const [qunatity,setQuantity] = useState(1);//
    const [product,setProduct] = useState(null)
    const [productOrder,setProductOrder] = useState()//ye is liye hai kyoki jo product apan order ke liye bhej rahe
    const dispatch  = useDispatch()
 
    
    // console.log(productOrder)
    
    useEffect(()=>{
   fetchSingleProdect()
   async function fetchSingleProdect(){
      const res = await fetch(PRODUCT_PAGE+id);
      const data = await res.json();
      // console.log(data.product)
      setProduct(data.product)
      const {name,price,category,_id,Stock} = data.product
      // console.log(data.product)
      const image = data.product.image[0].url
      // console.log(image)
      setProductOrder({
        name,
        price,
        category,
        _id,
        Stock,
        image

      })
      
    }
    },[dispatch,updateProductRe])
    
   
   

   
  return (!product || updateProductRe)? <Shimmer/>: (
  <>
  
  <HStack w={"100%"} justifyContent={"center"} marginBottom={"30px"}>
  <HStack w={"90%"} flexWrap={"wrap"}justifyContent={"space-around"}>

  <Box w={"330px"} minH={"450px"} maxH={"600px"} margin={"10px"} padding={"10px"}>
  <Carousel>
  {
   product.image.map((item)=>{
  return  <div key={item._id} > 
  <img src={item.url}  className={'image-sizes'} alt="" />

</div>
   })
  }
        
               
            </Carousel>

  </Box>

  <Box minH={"430px"} maxH={"600px"}  w={"400px"} padding={"10px"} >
    
    <Box maxH={"220px"} overflow={"hidden"}>
    <Text fontSize={"24px"} >{product.name}</Text>

    </Box>
    <HStack marginTop={"3px"}><Rating name="half-rating-read" value={product.ratings} precision={0.5} readOnly /></HStack>
    <Text fontSize={"24px"} fontWeight={"semibold"} >₹ {product.price}</Text>
    
  
   {(product.Stock)?<HStack marginTop={"15px"}>
     
     <Button size={"sm"} colorScheme={'purple'} onClick={()=>{
      const stock = product.Stock
        if(qunatity<stock){
         setQuantity(qunatity+1)
        }else{
         setQuantity(qunatity)
        }
     }} >+</Button><Text>{qunatity}</Text><Button size={"sm"} colorScheme={"purple"} onClick={()=>{
         if(qunatity>0){
             setQuantity(qunatity-1)
         }
     }} >-</Button>
 </HStack>:""} 

    <Text fontSize={"17px"} fontWeight={"semibold"} color={(product.Stock)?"lightgreen":"red"}> {(product.Stock)?"Stock : "+product.Stock:"Out Of Stock"}</Text>
   
   {(product.Stock)?<Box> <HStack w={"full"} marginTop={"15px"}>
        <Button w={"full"} colorScheme={"purple"} onClick={async()=>{

            setQuantity(1);
           
       
        
          const { name,category,price,_id,Stock,image} = productOrder
          console.log("I am before before Dispatch")
          dispatch(setcart({
            qunatity,name,category,price,Stock,_id,image
          })) 
         
          } } >Add to Cart</Button>
    </HStack>
    {((qunatity+item?.quantity)>product.Stock)? <Text color={"red"}>You can't exceed stock you already added  {item?.quantity} in your cart we will add maximum stock in your cart </Text>:""} 

 
   
<Link to={'/order/shippingdetails'} >
<HStack w={"full"} marginTop={"15px"}>
  <Button w={"full"} colorScheme={"purple"} onClick={()=>{
    console.log("I am clicked")
    
    
    const {name,price,category,_id,image,Stock} = productOrder
    const quantity = qunatity //because spelling galat ho gayi thi is liye
    dispatch(setOrderedProduct([{
      name,price,category,_id,quantity,image,Stock
    }]))
  }}>Buy Now</Button>
  </HStack>
  </Link> </Box>
  :""}
    
   
  
    
  </Box>


  
  </HStack>
  </HStack>



  <Accordion allowToggle colorScheme={"purple"} margin={"30px"}>
  <AccordionItem  bgColor={"purple.500"} color={"white"}>
    <h2>
      <AccordionButton pb={4}>
        <Box as="span" flex='1' textAlign='left'>
         About the {product.category}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     {product.desc}
    </AccordionPanel>
  </AccordionItem>

 
</Accordion>

<ProductReview id={product._id} />

  </>
  )
}

export default Product