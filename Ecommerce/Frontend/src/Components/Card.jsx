import React from 'react'
import { HStack, Box, Image, Text, VStack } from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'

const Card = ({name,price,image,ratings}) => {
    return (
        <>
            <Box w={["150px","250px"]} minH={["200px","360px"]} margin={"10px!important"} padding={"10px"} border={"1px"} borderColor={"purple.100"} alignItems={"flex-start"} css={":hover{box-shadow: 0px 0px 2px 0px}"}  >

                <Box w={["130px","230px"]} h={["180px","220px"]}  >
                    <HStack justifyContent={"center"} h={["180px","200px"]} marginTop={["5px","10px"]} >
                        <Image src={image[0]?.url} w={["130px","180px"]} h={["140px","200px"]}  />
                    </HStack>
                </Box>

             <VStack justifyContent={"flex-end"} alignItems={"start"}h={["110px","150px"]}>
                <HStack h={"43px"} overflow={"hidden"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Text fontSize={["13px","15px"]} fontWeight={"bold"}  >{name}</Text>
                </HStack>
                <Text fontSize={["15px","17px"]} fontWeight={"bold"} color={"purple.400"} >₹{price}</Text>
                <HStack> <AiFillStar color='yellow' /> <Text fontWeight={"semibold"}  > {(ratings)?(Number(ratings).toPrecision(2)):"No Rating"}</Text></HStack>


              </VStack>
             

            </Box>
        </>
    )
}

export default Card