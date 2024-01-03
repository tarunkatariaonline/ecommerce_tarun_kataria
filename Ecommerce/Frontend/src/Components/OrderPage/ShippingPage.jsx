import React, { useState,useEffect } from 'react'
import { Container, VStack, Input, Button, Text, Textarea, Select, Avatar,Image,HStack,InputLeftAddon,InputGroup} from '@chakra-ui/react'

import { useDispatch,useSelector } from 'react-redux'
import { setShippingInfo } from '../../Redux/Slice/shippingInfoSlice'
import { Link } from 'react-router-dom'
const ShippingPage = () => {

  const dispatch = useDispatch()
  const orderedProduct = useSelector((state) => state.orderedProductDetailsReducer.orderedProduct)

  
   const [address,setAdddress] = useState("")
   const [city,setCity]= useState("")
   const [state,setState]= useState("")
   const [country,setCountry] = useState("")
   const [pinCode,setPinCode] = useState("")
   const [phoneNo,setPhoneNo]=useState("")
    

 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cda2a21ff24549728e498ee3a0c47883`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
             
             const {city,state,country,postcode} = data.results[0].components
            //  console.log(data.results[0].components)
              setCity(city)
              setCountry(country)
              setState(state)
              setPinCode(postcode)
              
             console.log( city,state,country)
            }
          })
          .catch((error) => console.log(error));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleEvent = ()=>{

dispatch(setShippingInfo({address,city,state,country,phoneNo,pinCode}))
  }
  if(orderedProduct.length===0){
    return <div>Please Order Product</div>
  }
  return (
   <>
    <Container maxW={"container.xl"} h={"100vh"} p={"16"}>




    <form method='post' onSubmit={(e)=>{
    e.preventDefault()
    }} >
    <VStack alignItems={"stretch"} spacing={"8"} w={["full", "96"]} m={"auto"} >
      


         <Text fontSize={"30px"} fontWeight={"semibold"}>Shipping Details :</Text>
          
      
        <Text fontSize={"17px"} margin={"5px!important"} padding={"0px!important"} >Address :</Text>

      
        <Input type={"text"}  margin={"0px!important"}  name={"address"} required value={address}   placeholder={"Enter Your Address"}  border={"1px solid purple"} onChange={(e)=>{
          setAdddress(e.target.value)
        }} />

        
        
           
        <Text fontSize={"17px"} margin={"5px!important"} padding={"0px!important"} >City :</Text>
        <Input type={"text"}  margin={"0px!important"}  name={"city"} value={city}  placeholder={"Enter Your City "}  border={"1px solid purple"} onChange={(e)=>{
          setCity(e.target.value)
        }} required />



        <Text fontSize={"17px"} margin={"5px!important"} padding={"0px!important"} >State :</Text>
        <Input type={"text"} required margin={"0px!important"}  name={"state"} value={state} placeholder={"Enter Your State"}  border={"1px solid purple"}onChange={(e)=>{
          setState(e.target.value)
        }}   />

        <Text fontSize={"17px"} margin={"5px!important"} padding={"0px!important"} >Country :</Text>
        <Input type={"text"} required  margin={"0px!important"}  name={"country"} value={country} placeholder={"Enter Your Country"}  border={"1px solid purple"}onChange={(e)=>{
          setCountry(e.target.value)
        }}  />

        <Text fontSize={"17px"} margin={"5px!important"} padding={"0px!important"} >Pincode :</Text>
        <Input type={"number"}  margin={"0px!important"}  name={"pinCode"} value={pinCode} placeholder={"Enter Your Pincode"}  border={"1px solid purple"}onChange={(e)=>{
          setPinCode(e.target.value)
        }} required />

        <Text fontSize={"17px"} margin={"5px!important"} padding={"0px!important"} >Phone Number :</Text>
       <InputGroup   margin={"0px!important"} >
        <InputLeftAddon children='+91' />
        <Input type={"number"}  margin={"0px!important"}  name={"phoneNo"} value={phoneNo} min="10" max={"10"} placeholder={"Enter Your Phone Number"}  border={"1px solid purple"}onChange={(e)=>{
          setPhoneNo(e.target.value)
        }} isRequired />

</InputGroup>

  {((!address) || (!phoneNo) || (!state) || (!country) || (!city) || (!pinCode) || (phoneNo.length<10) ||  (phoneNo.length>10))?<Button   type="submit" variant={"solid"}  alignSelf={"streach"} colorScheme={"purple"}  > Submit </Button>: <Link to={'/order/ordernow'}>
        
        <Button   type="submit" variant={"solid"}  w={"full"} alignSelf={"streach"} onClick={handleEvent} colorScheme={"purple"}  > Next </Button>
         </Link> }
  

    </VStack>

    </form>


</Container>
   </>
  )
}

export default ShippingPage