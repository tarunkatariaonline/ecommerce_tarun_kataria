import React, { useState } from 'react'
import { Container, VStack, Input, Button, Text, Textarea, Select, Avatar,Image,HStack,} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { CREATE_PRODUCT_ADMIN } from '../Apis/Apis'

import axios from 'axios'

import { Link } from 'react-router-dom'
import { render } from '@testing-library/react'
import categories from '../../categories'
import AdminNavbar from './AdminNavbar'

const CreateProduct = () => {
    const toast = useToast()
    const [product, setProduct] = useState({
        name: "",
        desc: "",
        price: "",
        category: "",
        Stock: ""

    })

    const [images,setImage] = useState([])
    const [preview,setPreview]= useState([])
    const {name,desc,price,category,Stock} = product
    
    const imageUpload = (e)=>{
        
        
        const file = e.target.files
        Array.from(file).forEach((item)=>{
        const reader = new FileReader()
        reader.onload= ()=>{
            if(reader.readyState===2){
                
                setPreview(preview=>[...preview,reader.result])
                setImage(images=>[...images,item])
            }
        }
        reader.readAsDataURL(item)
        })
        console.log(e.target.files.length)
       
        
    }

    console.log(images)
    const CreateProductPost = async(e)=>{
    e.preventDefault()
      const myForm = new FormData()
      myForm.append("name",name)
      myForm.append("desc",desc)
      myForm.append("price",price)
      myForm.append("Stock",Stock)
      myForm.append("category",category)
      images.forEach((image)=>myForm.append("files",image))
      
     console.log(images)
     try{
      const res = await axios.post(CREATE_PRODUCT_ADMIN,myForm,{
        headers:{
            'Content-Type':'multipart/form-data',
           
        },
        withCredentials:true
        
    
      })

      const message =  res?.data?.message;
        console.log(message)
      console.log("hello")
      console.log(message)
      if(res.status===201 || res.status===200){
        toast({
            title: 'Success',
            description:  message,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position:"bottom-left",
            
          })
       }
    }catch(err){
        

       const message=  err.response.data.message
       console.log(err.response.status)
       console.log(err.response)
        if(err.response.status===404){
            
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"bottom-left",
            
              })
           }
        
    }
    //   console.log(res)
    //   console.log(res.response.status)
      
      
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProduct(values => ({ ...values, [name]: value }))

    }
    return (
        <>
        <AdminNavbar link={"createproduct"}/>
            <HStack  h={"100vh"} p={"4"} justifyContent={"center"}>

                <form onSubmit={CreateProductPost}  >
                

               
                    <VStack alignItems={"stretch"} spacing={"8"} w={["full", "96"]} m={"auto"} my={"16"}>
               
               <HStack>
               {(!preview.length===0)?"":preview.map((item,index)=>{
                 return <Image src={item} key={index} h={"70px"} w={"60px"} />
                            } )}
                  
             
                </HStack>
                          
                        <Input type={"file"} multiple  onChange={imageUpload} />
                        <Input type={"text"} name={"name"} onChange={handleChange} placeholder={"Enter Product Name"} value={product.name} border={"1px solid purple"} required />

                        <Textarea name="desc" value={product.desc} onChange={handleChange} placeholder={"Enter Product Description"}>

                        </Textarea>

                        <Input type={"number"} value={product.Stock} onChange={handleChange} name={"Stock"}
                            placeholder={"Enter Product Stock"}  border={"1px solid purple"} required />

                        <Input type={"number"} value={product.price} name={"price"} onChange={handleChange}
                            placeholder={"Enter Product Price"} border={"1px solid purple"} required />

                        <Select placeholder='Select Category' name="category" value={product.category} onChange={handleChange} >
                            {categories.map((item, index) => {
                                return <option key={index} value={item.value}>{item.label}</option>
                            })}
                        </Select>



{/* 
                         {images.map((item)=>{
                            return <li>{item.name}</li>
                         })} */}

                        <Button  variant={"solid"} type={"submit"} alignSelf={"streach"} colorScheme={"purple"}  >
                           Create Product                        </Button>

                        <Text textAlign={"right"} >Old user ?</Text>
                        <Button variant={"link"} my={"3px!important"}  alignSelf={"flex-end"}>
                            <Link to="/user/login">Sign in</Link>
                        </Button>

                    </VStack>

                </form>
            </HStack>
        </>
    )
}

export default CreateProduct