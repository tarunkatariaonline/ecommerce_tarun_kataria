import React, { useState } from 'react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,Button, Input,Text, Textarea,
   
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import { Select } from '@chakra-ui/react'
  import { useDispatch } from 'react-redux'
  import { UPDATE_PRODUCTS_ADMIN } from '../../Apis/Apis'

  import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { updateAllProductsAdminReduxFunc } from '../../../Redux/Slice/updateAllProductsAdminSlice'
const UpdateProduct = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updateProduct,setUpdateProduct] = useState({
        name:props.name,
        price:props.price,
        desc:props.desc,
        Stock:props.Stock,
        category:props.category,
        id:props._id

    })
    const dispatch = useDispatch()
    const toast = useToast()

    const {name,price,desc,Stock,category,id} = updateProduct

    const cancelRef = React.useRef()

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name)
        console.log(value)
        setUpdateProduct(values => ({...values, [name]: value}))
      }


      const updateProductApi = async()=>{
        dispatch(updateAllProductsAdminReduxFunc(true))
       const res = await fetch(UPDATE_PRODUCTS_ADMIN+id,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
       credentials:"include",
        body:JSON.stringify({
            name,
            desc,
            Stock,
            price,
            category
        })
       });

       const json = await res.json()
       console.log(json)

       if(res.status===200){
        toast({
          title: 'success',
          description: "Product Updated Sucessfully",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position:"bottom-left",
      
        })
       }else{
        toast({
          title: 'Error',
          description: "Product Not Updated",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position:"bottom-left",
      
        })
       }
       dispatch(updateAllProductsAdminReduxFunc(false))

        

      }
  
  return (
   <>

<Button colorScheme='blue' size={"sm"} onClick={onOpen}>
<AiFillEdit/>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              
            </AlertDialogHeader>

            <AlertDialogBody>

            <Text margin={"5px"}>Product Id : </Text>
              <Input type={"text"}  value={id} disabled  />
              <Text margin={"5px"}>Product Name : </Text>
              <Input type={"text"} value={name} name={"name"} onChange={handleChange}  placeholder={"Enter Product Name"} />

             
              <Text margin={"5px"}  >Product Description: </Text>
              <Textarea placeholder='Enter Desc' value={desc} name={"desc"} onChange={handleChange}    ></Textarea>
              <Text margin={"5px"}>Product Stock </Text>
              <Input type={"text"}  value={Stock} name={"Stock"} onChange={handleChange}   placeholder={"Enter Product Stock"} />
              <Text margin={"5px"}>Product Price: </Text>
              <Input type={"text"} value={price} placeholder={"Enter Product Price"} onChange={handleChange}   name={"price"} />
              <Text margin={"5px"}>Product Category: </Text>
              <Select placeholder="Choose Category" name={"category"} onChange={handleChange}     >

               <option value="Smartphones" >Smartphones</option>
              </Select>
            
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                CANCEL
              </Button>
              <Button colorScheme="purple" onClick={()=>{
                onClose();
                updateProductApi()
              }} ml={3}>
                UPDATE
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
   
   </>
  )
}

export default UpdateProduct