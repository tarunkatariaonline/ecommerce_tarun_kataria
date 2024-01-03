import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
    Drawer,
    DrawerBody,
  
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,Button,useDisclosure,Text, Box
  } from '@chakra-ui/react'

  import {AiOutlineMenu} from 'react-icons/ai'

const AdminNavbar = ({link}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const categary= link

  
  return (
    <>
     <Button ref={btnRef} mx={"10px"} colorScheme='purple' onClick={onOpen}>
     <AiOutlineMenu fontSize={"20px"} /> <Text mx={"3px"}  >Admin Panel</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Admin Panel</DrawerHeader>

          <DrawerBody>
            <Box w={"full"}  alignItems={"flex-start"}  justifyContent={"center"} h={"full"}>
     <Link to={'/admin/dashboard'}>  <Button w={"full!important"} alignSelf={"streach!important"} variant={(categary==="dashboard")?"solid":"outline"}   colorScheme={"purple"} my={"10px"}  >Dashboard - Admin</Button>
     </Link> 

     <Link to={'/admin/createproduct'}> <Button w={"full"} variant={(categary==="createproduct")?"solid":"outline"}  colorScheme='purple' alignSelf={"streach!important"}  my={"10px!important"}>  Create Product - Admin  </Button>
     </Link> 

        
     <Link to={'/admin/allproducts'}  >  <Button w={"full"} alignSelf={"streach"}  variant={(categary==="allproducts")?"solid":"outline"}  colorScheme={"purple"}    my={"10px!important"}>  All Products - Admin </Button>   </Link>

       <Link to={'/admin/allusers'}>   <Button w={"full"}  variant={(categary==="allusers")?"solid":"outline"} alignSelf={"streach!important"}  colorScheme={"purple"}  my={"10px!important"}>All Users - Admin </Button>
       </Link> 
       <Link to={'/admin/allorders'}> 
          <Button w={"full"}  variant={(categary==="allorders")?"solid":"outline"} alignSelf={"streach!important"}   colorScheme={"purple"}  my={"10px!important"}> All Orders - Admin </Button>

          </Link>
          
            </Box>
          </DrawerBody>

        
        </DrawerContent>
      </Drawer>
    <Outlet/>
    </>
  )
}

export default AdminNavbar