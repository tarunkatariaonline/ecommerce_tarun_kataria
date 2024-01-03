import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { useEffect } from 'react';
import { Doughnut,Line } from 'react-chartjs-2';
import { Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,Tooltip,
  ArcElement,
  Legend,
  
} from 'chart.js'
import { Box,HStack } from '@chakra-ui/react';
import { ALL_ORDERS_ADMIN, ALL_PRODUCTS, ALL_USERS_ADMIN } from '../Apis/Apis';
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,Tooltip,
  ArcElement,
  Legend,)
const AdminDashboard = () => {
  const [order,setOrder] = useState(0)
  const [product,setProduct] = useState(0)
  const [inStockProduct,setInStockProduct] = useState(0)
  const [outStockProduct,setOutStockProduct] = useState(0)
  const [users,setUsers] = useState(0)
  const [totalAmount,setTotalAmount] = useState(0)
  

const doughnutStockState={
  labels:["Out of Stock","In Stock"],
  datasets:[
    {
      borderColor:["rgba(62,12,171,1)","rgba(214,43,129,1)"],
      backgroundColor:["rgba(62,12,171,0.5)","rgba(214,43,129,0.5)"],
      hoverBackgroundColor:["rgba(62,12,171,1)","rgba(214,43,129,1)"],
      data:[outStockProduct,inStockProduct]
    }
  ],
};
const lineState = {
  labels:["Initial Amount","Amount Earned"],
  datasets:[{
    label:"TOTAL AMOUNT",
  backgroundColor:["purple"],
  hoverBackgroundColor:["rgba(62,12,171,1)"],
  data:[0,totalAmount],
  }]
}

async function fetchOrders(){
const res = await fetch(ALL_ORDERS_ADMIN,{

  credentials:"include"
})
const json = await res.json()
console.log(json.orders)

let totalPrice =0;
for(let i =0;i<json.orders.length;i++){
  totalPrice = totalPrice+json.orders[i].totalPrice
}
setOrder(json.orders.length)
setTotalAmount(totalPrice)
}


async function fetchProducts(){
  const res = await fetch(ALL_PRODUCTS)
  const json = await res.json()
  console.log(json.length)
  setProduct(json.length)
 
  let OutStock=0;
  for(let i=0;i<json.length;i++){
   if(json[i].Stock===0){
      OutStock++;
      
   }
  }

setOutStockProduct(OutStock)
setInStockProduct(json.length-OutStock)
  

  
  }


  async function fetchUsers(){
    const res = await fetch(ALL_USERS_ADMIN,{
      credentials:"include"
    })
    const json = await res.json()
    console.log(json)
    setUsers(json.users.length)
  }
useEffect(()=>{
fetchOrders()
fetchProducts()
fetchUsers()

},[])
  
  return (

    <> 
       <Box>

    <AdminNavbar link={"dashboard"}/>


    <HStack justifyContent={"center"} my={"40px"}>
        
       

        <Box fontSize={["14px","23px"]} w={["100px","180px"]} bgColor={"red.400"} h={["100px","180px"]} borderRadius={"50%"}  display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} color={"white"} marginX={["10px!important","30px!important"]}>
          <Box>
            Product
          </Box>
          <Box>
          {product}
          </Box>
        </Box>


        <Box fontSize={["14px","23px"]} w={["100px","180px"]} bgColor={"yellow.300"} h={["100px","180px"]} borderRadius={"50%"}  display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}  marginX={["10px!important","30px!important"]}>
          <Box>
            Orders
          </Box>
          <Box>
         {order}
          </Box>
        </Box>

        
        <Box fontSize={["14px","23px"]} w={["100px","180px"]} bgColor={"purple.500"} h={["100px","180px"]} borderRadius={"50%"}  display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} color={"white"} marginX={["10px!important","30px!important"]}>
          <Box>
           Users
          </Box>
          <Box>
           {users}
          </Box>
        </Box>
        
    </HStack>
   
<HStack justifyContent={"center"} my={"40px"}>


    <Box w={["95%","60%"]}>
  <Line  data={lineState}/>
 </Box>
 </HStack>
   
   <HStack justifyContent={"center"}>
   <Box width={"250px"}>
<Doughnut data={doughnutStockState}/>
</Box>
</HStack>
<Box>

</Box>
 </Box>
 
 
    </>
  )
}

export default AdminDashboard