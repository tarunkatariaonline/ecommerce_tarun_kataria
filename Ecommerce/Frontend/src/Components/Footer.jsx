import React from 'react'
import { Box ,Stack,Heading,VStack,HStack,Text} from '@chakra-ui/react'
import {AiFillInstagram,AiFillGithub,AiFillTwitterCircle} from 'react-icons/ai'


let date = new Date();
let year = date.getFullYear();

const Footer = () => {
  
  return (<>


    <Box bgColor={"purple.500"} minH={"38"} p={"8"} color="white" w={"100%"} marginTop={"50px"}>
        <Stack direction={["row"]} w={"100%"} justifyContent={"space-around"} alignItems={"center"}>
         
         

<VStack  >


<Heading fontSize={["25px","3xl"]} ml={"0px"} >
   Ecommerce
</Heading>

<Text fontSize={["12px","20px"]}>
All copyrights &copy; received {year}
</Text>

    

</VStack>



<VStack >
<Heading size={"sm"} textTransform={"uppercase"} >

Links
    

</Heading>

<a href="https://www.instagram.com/tarunkatariaonline/"> <HStack css={
  ":hover{color:black;}"
}> <AiFillInstagram fontSize={["15px","20px"]}/> <Text fontSize={["15px","20px"]}>Instagram</Text> </HStack></a>
<a href="https://github.com/tarunkatariaonline"> <HStack css={
  ":hover{color:black;}"
}> <AiFillGithub fontSize={["15px","20px"]}/> <Text fontSize={["15px","20px"]}>Github</Text> </HStack></a>

<a href="https://twitter.com/tarunkatariain?t=fUKedgYisO8W0GVa7pWa4w&s=09"> <HStack css={
  ":hover{color:black;}"
}> <AiFillTwitterCircle fontSize={["15px","20px"]}/> <Text fontSize={["15px","20px"]}>Twitter</Text> </HStack></a>



</VStack>


        </Stack>

    </Box>

    </>
  )
}

export default Footer