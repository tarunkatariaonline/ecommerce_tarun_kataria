
import React, { useEffect, useState } from 'react'
import Card from '../Card'
import { Link } from 'react-router-dom'
import { Input, Select } from '@chakra-ui/react'

import {  HStack } from '@chakra-ui/react'
import categories from '../../categories'


import Shimmer from '../Loading/Shimmer'
import ProductNotFount from './ProductNotFount'
import { ALL_PRODUCTS } from '../Apis/Apis'


const sortByArray = [
  {
    value:"name",
    label:"Sort : A-Z"
  },
  {
    value:"-name",
    label:"Sort : Z-A"
  },
  {
    value:"price",
    label:"Price : Low-High "
  },
  {
    value:"-price",
    label:"Price : High-Low"
  }
]

const AllProduct = () => {
 
     const [allProduct,setAllProduct]= useState(null)
     const [category,setCategory] = useState("")
     const pageNo=1
     const [sortBy,setSortBy] = useState("")
     const [searchKeyword,setSearchKeyword] =useState("")
 
 
    
     
    
     
     
   
    
     useEffect(()=>{
      async function fetchAllProducts(){
    
       const url = ALL_PRODUCTS+`?name=${searchKeyword}&category=${category}&page=${pageNo}&sort=${sortBy}`;

       console.log("function called");
       
        const result = await fetch(url,{
         headers: {
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },
        
    
         
        })
        const data = await result.json()
       //  console.log(data);

    
   
      setAllProduct(data)
     }
   
    
      fetchAllProducts()
     },[category,pageNo,sortBy,searchKeyword])

   
 
    
     
     return (!allProduct) ?<Shimmer/>: (
       <>
   
     
   
    
     <HStack w={"100%"} justifyContent={"center"} my={"30px"}>
      <HStack w={["95%","100%"]} justifyContent={"center"}>
      <Input w={["95%","60%"]} borderRadius={"0px"} border={"2px solid"} borderColor={"purple.400"} placeholder={"Search Product Here"} value={searchKeyword} onChange={(e)=>{
        setSearchKeyword(e.target.value )
      }}/>
     
      </HStack>
     </HStack>



<HStack justifyContent={"space-between"} w={"100%"} my={"20px"} >
   <Select placeholder='Select Category' ml={"20px"} size={"sm"} w={"150px"} border={"1px solid"} borderColor={"purple.400"} onChange={(e)=>{
      setCategory(e.target.value)
   }}>
   {categories.map((item,index)=>{
    return <option key={index} value={item.value}>{item.label}</option>
  })}


</Select>

<Select placeholder='Featured : Sort' w={"150px"} size={"sm"} mr={"20px!important"}  border={"1px solid "} borderColor={"purple.400"} onChange={(e)=>{
      setSortBy(e.target.value)
   }}>
   {sortByArray.map((item,index)=>{
    return <option key={index} value={item.value}>{item.label}</option>
  })}


</Select>
</HStack>
{(allProduct.length===0)?<ProductNotFount/>:<HStack w={"100%"} justifyContent={"center"}>
       <HStack flexWrap={"wrap"} w={["100%","90%"]} justifyContent={"center"}>
   
   {
     allProduct.map((item)=>{
      return <Link to={'/product/'+item._id} key={item._id}><Card  {...item}/> </Link> 
     })
   }
   
   </HStack>


   
   </HStack>}
   
  
       </>
     )
}

export default AllProduct