import React from 'react'

import { HStack, Image, Text,Box, Stack, Button } from '@chakra-ui/react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
import {MdDelete} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { DELETE_PRODUCTS_ADMIN } from '../../Apis/Apis'
import { updateAllProductsAdminReduxFunc } from '../../../Redux/Slice/updateAllProductsAdminSlice'

const DeleteProduct = ({id}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()    
    const cancelRef = React.useRef()
    const dispatch = useDispatch()

    const deleteProductApi = async()=>{
      dispatch(updateAllProductsAdminReduxFunc(true))
     const res = await fetch(DELETE_PRODUCTS_ADMIN+id,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        },
        credentials:"include"

     })

     const json = await res.json()
     console.log(json)

     if(res.status===201||res.status===200){
        toast({
            title: json.message,
            
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          dispatch(updateAllProductsAdminReduxFunc(false))
       }else{
        toast({
            title: json.message,
            
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
          dispatch(updateAllProductsAdminReduxFunc(false))
       }

       

    }
  return (
    <>
      <Button size={["sm","md"]} color={"red.400"}  onClick={onOpen} ><MdDelete /> </Button> 
     <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Product Id : {id}
            </AlertDialogHeader>
           

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{
                onClose()
                deleteProductApi()
                
              }} ml={3}>
                <MdDelete />
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </>
  )
}

export default DeleteProduct