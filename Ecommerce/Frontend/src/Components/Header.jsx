import {HStack,Button,Avatar,AvatarBadge,Text,Stack} from '@chakra-ui/react'
import React from 'react'
import { Link} from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

import { AiFillDashboard, AiOutlineShoppingCart,AiOutlineLogin } from 'react-icons/ai'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {AiOutlineDropbox} from 'react-icons/ai'
import { MdAccountBox } from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import Badge from '@mui/material/Badge';



import {
  Popover,
  PopoverTrigger,
  PopoverContent,

  PopoverBody,

  PopoverArrow,

} from '@chakra-ui/react'

import { useSelector } from 'react-redux'
import useOnline from '../Hooks/useOnline'

const Header = () => {


  const cartData = useSelector((state => state.cartReducer.cart));

  let total =0;
  for(let i =0;i<cartData.length;i++){
   total = total+cartData[i].quantity;

  }

 

  const user = useSelector(state=>state.userReducer.user)
  const isOnline = useOnline()

  
  


  return (
    <>
  
    <HStack w={"full"}  h={"100px"} justifyContent={"space-between"}>
   <Link to={'/'}> <Text ml={"20px"} fontSize={["25px","30px"]} fontWeight={"bold"} color={"purple.600"} fontFamily={"monospace"} >Ecommerce</Text></Link>

   
    <HStack mr={"20px!important"}>


  {(user)? <Popover placement={"bottom-end"} >
  <PopoverTrigger >
  <Avatar size={"sm"} mx={"5px"} src={user?.avatar?.url} bgColor={"purple.500"} name={user?.name} cursor={"pointer"}>
   {(isOnline)?<AvatarBadge boxSize='1.0em' bg='green.500' />:<AvatarBadge boxSize='1.0em' bg="red.500" />} 
  </Avatar>
  {/* "https://cdn.landesa.org/wp-content/uploads/default-user-image.png" */}
  </PopoverTrigger>
  <PopoverContent w={"170px"}  >
    <PopoverArrow />
   
    
   {(user)? <PopoverBody >

<Stack justifyContent={"center"} dir={"column"}  >
<Link to={'/user/account'}> <Button size={"sm"} w={"full"}  colorScheme={"purple"} mt={"10px"}> <MdAccountBox  fontSize={"20px"}/> Account </Button></Link>

<Link to={'/order/myorders'}> <Button size={"sm"} w={"full"}  colorScheme={"purple"} > <AiOutlineDropbox fontSize={"20px"}/> My Orders </Button> </Link>




 {(user?.isAdmin===true) && <Link to={'/admin/dashboard'}> <Button size={"sm"} w={"full"}  colorScheme={"red"} > <AiFillDashboard fontSize={"20px"}/> Dashboard </Button> </Link>} 

<Link to={'/user/logout'}> <Button size={"sm"} w={"full"}  colorScheme={"purple"} > <FiLogOut fontSize={"20px"}/> Logout </Button> </Link>
</Stack>
</PopoverBody>:<PopoverBody >

<Stack justifyContent={"center"} dir={"column"}  >
<Link to={'/user/login'}> <Button size={"sm"} w={"full"} colorScheme={"purple"} mt={"10px"}> <AiOutlineLogin  fontSize={"20px"}/> Sign In </Button></Link>

<Link to={'/user/signup'}> <Button size={"sm"} w={"full"} variant={"outline"} colorScheme={"purple"} > <AiOutlineUserAdd fontSize={"20px"}/> Sign Up </Button> </Link>
</Stack>
</PopoverBody>} 
  </PopoverContent>
</Popover>: <Popover placement={"bottom-end"} >
  <PopoverTrigger >
  <Avatar size={"sm"} mx={"5px"} src={"https://cdn.landesa.org/wp-content/uploads/default-user-image.png"}  cursor={"pointer"}>
  {(isOnline)?<AvatarBadge boxSize='1.0em' bg='green.500' />:<AvatarBadge boxSize='1.0em' bg="red.500" />} 
  </Avatar>
  {/* "https://cdn.landesa.org/wp-content/uploads/default-user-image.png" */}
  </PopoverTrigger>
  <PopoverContent w={"170px"}  >
    <PopoverArrow />
   
    
   <PopoverBody >

<Stack justifyContent={"center"} dir={"column"}  >
<Link to={'/user/login'}> <Button size={"sm"} w={"full"} colorScheme={"purple"} mt={"10px"}> <AiOutlineLogin  fontSize={"20px"}/> Sign In </Button></Link>

<Link to={'/user/signup'}> <Button size={"sm"} w={"full"} variant={"outline"} colorScheme={"purple"} > <AiOutlineUserAdd fontSize={"20px"}/> Sign Up </Button> </Link>
</Stack>
</PopoverBody> 
  </PopoverContent>
</Popover>} 
      
    

      {/* <Button size={"sm"} colorScheme={"purple"}> <AiOutlineDropbox fontSize={"20px"}/> Orders</Button>
       */}
   
   <Link to={'/cart'}>  <Badge badgeContent={total} color="warning" >  <Button  borderRadius={"25px"} size={"sm"} px={"0px"} colorScheme={"purple"} >   <AiOutlineShoppingCart fontSize={"18px"} />   </Button> </Badge> </Link>
  
      
      {/* <Button size={"sm"} colorScheme={"purple"} > <AiFillDashboard fontSize={"20px"}/> Dashboard</Button> */}
      <ColorModeSwitcher  />
    

   
    </HStack>

  


    </HStack>


   
    
    </>
  )
}

export default Header