import React, { useEffect, useState } from 'react'
import { ALL_PRODUCTS_ADMIN } from '../../Apis/Apis'
import {
  Table,
  Thead,
  Tbody,
 
  Tr,
  Th,
  Td,

  TableContainer,
} from '@chakra-ui/react'
import { Image,Box } from '@chakra-ui/react'
import DeleteProduct from './DeleteProduct'
import UpdateProduct from './UpdateProduct'
import AdminNavbar from '../AdminNavbar'
import Shimmer from '../../Loading/Shimmer'
import { useSelector } from 'react-redux'

const AllProductsAdmin = () => {
 
 const [products,setProducts] = useState(null)
  
  const updateAllProductsAdminRe = useSelector(state=>state.updateAllProductsAdminReducer.updateAllProductsAdminUsingRedux)
  useEffect(()=>{
    fetchAllProductsApi()
   },[updateAllProductsAdminRe]);
  const fetchAllProductsApi = async()=>{
   
    const res = await fetch(ALL_PRODUCTS_ADMIN,{
      method:"GET",
      headers:{
        "Content-type":"application/json"
      }
      ,
      credentials:"include"
    });
    const json = await res.json();
    console.log(json)
      
    if(res.status===406){

    }else{
     setProducts(json)
    }
  }
  return (!products || updateAllProductsAdminRe )?<Shimmer/>: (
    <>
    
    <AdminNavbar link={"allproducts"}/>
     <TableContainer  >
    <Table variant='striped' colorScheme={"linkedin"} size={"sm"}>
      
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Product Name</Th>
          
          <Th >Stock</Th>
          <Th >Price</Th>
          <Th >Delete/Edit</Th>
        </Tr>
      </Thead>
      <Tbody>

      {products.map((product)=>{
    return  <Tr key={product._id}>
          <Td> <Image src={product?.image[0]?.url} h={"50px"} w={"50px"} /> </Td>
          <Td><Box w={"200px"} overflow={"hidden"} display={"block"} >{product.name}</Box></Td>
         
          <Td>{product.Stock}</Td>
          <Td>{product.price}</Td>
          <Td><DeleteProduct id = {product._id}/> <UpdateProduct {...product}/> </Td>
  
        </Tr>
        
      })}
      </Tbody>
      
    </Table>
  </TableContainer>
      






    </>
  )
}

export default AllProductsAdmin