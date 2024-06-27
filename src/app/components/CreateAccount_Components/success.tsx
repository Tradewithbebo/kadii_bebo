import { Box, Button, Center, GridItem, SimpleGrid,Text,Image } from '@chakra-ui/react'
import React from 'react'

export default function Success() {
  return (
   <Box w={'full'}>
   <Center w={'full'}>
   <SimpleGrid pb={'488px'}
   width={['335px','400px']}
   columns={1}
   >
        <GridItem mb={'15px'} colSpan={1} >
       <Center> <Box  height='49px'
    width='51px' >
  <Image src='/image/Vector (3).png'
    alt='Bebo' />
</Box></Center>
        </GridItem>
        <GridItem mb={'24px'} textAlign={'center'} colSpan={1}>
            <Text color={'#021D17'} fontWeight={'600'} fontSize={["32px",'40px']}> 
            Success
            </Text>
            </GridItem>
            <GridItem mb={'40px'} textAlign={'center'} colSpan={1}>
            <Text color={'#666666'} fontWeight={'600'} fontSize={["16px",'18px']} >
            Password successfully updated
            </Text>
            </GridItem>
            <GridItem colSpan={1} mt={"4px"}>
            <Button
              bg="#0CBF94"
              fontSize={"16px"}
              fontWeight={"600"}
              w={"100%"}
              color={'#021D17'}
             
            >
              Continue{" "}
            </Button>
          </GridItem>
    </SimpleGrid>
   </Center>
   </Box>
  )
}
