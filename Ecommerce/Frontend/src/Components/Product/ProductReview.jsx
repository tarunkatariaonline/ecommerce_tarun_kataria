import { Avatar, Box, HStack, Text,Stack, Textarea, Button,useToast } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'


import { Rating } from '@mui/material'
import './style.css'
import Shimmer from '../Loading/Shimmer';
import { updateProductReduxFunc } from '../../Redux/Slice/updateProductSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PRODUCT_REVIEW } from '../Apis/Apis';
const ProductReview = (props) => {

  const [reviews,setReviews] = useState(null)
  const [comment,setComment] = useState("");
 
  const [rating,setRating] = useState(0)
  const productId = props.id;
  const toast = useToast()
  const dispatch = useDispatch()
 const updateProductRe = useSelector(state=>state.updateProductReducer.updateProductUsingRedux)
  const sendProductReview = async(e)=>{
    
  e.preventDefault();

  
  dispatch(updateProductReduxFunc(true))

  const res = await fetch(PRODUCT_REVIEW,{
   method:'POST',
   headers:{
    "Content-Type":"application/json"
   },
   credentials:"include",
   
   body:JSON.stringify({
    rating,
    comment,
    productId
   })
  })

  const json = await res.json();
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

      dispatch(updateProductReduxFunc(false))
    
   }else if(res.status===201 || res.status===200){
    toast({
        title: 'Success',
        description: json.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:"bottom-left",
        
      })


      dispatch(updateProductReduxFunc(false))
     
   }
  }
  
  const getReviewsApi = async()=>{
  const res = await fetch(PRODUCT_REVIEW+'?id='+productId,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",

    },
    credentials:"include"
   

  })

  const json =  await res.json()
  // console.log(json.review)
  setReviews(json.review)
  }
  
  useEffect(()=>{

   
  
      getReviewsApi()
   
      
    
   
  },[updateProductRe])
  return (!reviews || updateProductRe)? <Shimmer/> :(
    <>
  
    <Stack w={"100%"} mb={"30px"} justifyContent={"center"} alignItems={"center"} direction={"column"} >
    
    <Text w={"90%"} fontWeight={"semibold"} fontSize={"18px"} >Enter Review Here :</Text>
    <Rating className="border-black" precision={0.5} 
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
       
    <Textarea w={"90%"} border={"1px"} value={comment} onChange={(e)=>{
     setComment(e.target.value)
    }} placeholder='Enter Review Here :'></Textarea>
   {(updateProductRe)?<Button  isDisabled colorScheme='purple' type='submit' onClick={sendProductReview}  >Submit</Button>:<Button   colorScheme='purple' type='submit' onClick={sendProductReview}  >Submit</Button>} 

    <Text w={"90%"} fontWeight={"semibold"} fontSize={"18px"} >Reviews :</Text>
    {reviews.map((review)=>{
      return <Box key={review._id} w={"90%"} minH={"80px"}  border={"1px"} borderRadius={"4px"} >
   
      <HStack paddingTop={"10px"} px={"10px"}  > <Avatar name={review.name} /> <Text fontSize={"18px"}>{review.name}</Text> </HStack>
      <HStack mt={"3px"} pl={"10px"} >
      <Rating  name="half-rating-read" value={review.rating} precision={0.5} readOnly />
        </HStack>
      <Text marginTop={"5px"} px={"10px"} mb={"10px"} >{review.comment}</Text>
  
      </Box>
    })}
    


    
  
    
    </Stack>
    </>
  )
}

export default ProductReview