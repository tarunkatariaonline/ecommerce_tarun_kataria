import React, { useState } from 'react'
import { Input,FormLabel, Avatar,Stack,useToast } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,Button,useDisclosure
  } from '@chakra-ui/react'
  import { useSelector ,useDispatch} from 'react-redux'
import axios from 'axios'
import { updateProfileReduxFunc } from '../../Redux/Slice/updateProfileSlice'
import { UPDATE_PROFILE } from '../Apis/Apis'

const UpdateProfile = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
   const toast = useToast()
   const [profilePic,setProfilePic] = useState(null)
   const dispatch = useDispatch()

   
   const user = useSelector(state=>state.userReducer.user)
   const [updatedImagePreview,SetUpdatedImagePreview] = useState(null)

   const [name,setName] = useState("");
   const [phoneno,setPhoneno] = useState("");
   const [loading,setLoading] = useState(true)

    

    const uploadImage = (e)=>{
        if(e.target.files[0]){
      console.log(e.target.files[0])
      const file = e.target.files[0]
      setProfilePic(e.target.files[0])
      const reader = new FileReader()
      
      reader.onload= ()=>{
        if(reader.readyState===2){
         SetUpdatedImagePreview(reader.result)
        
        
        }
      }
      reader.readAsDataURL(file)
      

    }
    }
         
    const UpdateProfileApi = async ()=>{
      dispatch(updateProfileReduxFunc(true))
      setLoading(true)
     const formData = new FormData()
     formData.append('name',name)
     formData.append('phoneno',phoneno)
     formData.append('file',profilePic)
     const data = await axios.put(UPDATE_PROFILE,formData,{
        headers:{
            'Content-Type':'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
        withCredentials:true
        
   
     })
     console.log(data)

     if(data.status!==406){
      toast({
        title: 'Success',
        description: "Profile Updated Successfully.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:"bottom-left",
        
      })

     dispatch(updateProfileReduxFunc(false))
     }
     setLoading(false)

    }
    const clearImage = ()=>{
        SetUpdatedImagePreview(user?.avatar?.url)
        setLoading(false)
    }

  return (
 <>
  <Button colorScheme={"linkedin"} size={["sm","md"]} onClick={()=>{
    onOpen()
    setName(user?.name)
    setPhoneno(user?.phoneno)
    SetUpdatedImagePreview(user?.avatar?.url)
  }}>
       Update Profile
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Update Profile
            </AlertDialogHeader>

          
            <AlertDialogBody>
              
              <Stack alignItems={"center"}>
             <Avatar src={updatedImagePreview} size={"lg"}  />
             <Input type='file' onChange={uploadImage}/>
             </Stack>

            <FormLabel >Name :</FormLabel>
            <Input placeholder='Enter Your Name ' value={name} onChange={(e)=>{
                  setName(e.target.value)
            }} />
            <FormLabel >Phone Number :</FormLabel>
            <Input type="number" value={phoneno} placeholder='Enter Your Phone Number ' onChange={(e)=>{
               setPhoneno(e.target.value)
            }} />
            
            

            
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>{
                clearImage()
                onClose()
              }}>
                Cancel
              </Button>
             <Button colorScheme="linkedin" onClick={()=>{
                UpdateProfileApi()
                onClose()
              }} ml={3}>
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
 </>
  )
}

export default UpdateProfile