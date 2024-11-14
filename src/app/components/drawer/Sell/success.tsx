import { Box, Button, Center, GridItem, SimpleGrid,Text,Image } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Fade } from 'react-awesome-reveal'
import { MdHome } from 'react-icons/md'
import ConfettiPop from '../Buy/ConfettiPop'
// import ConfettiPop from './ConfettiPop'

export default function SuccessBuy() {
    const Router=useRouter()
  return (
   <Box w={'full'} pt={'70px'}>
   <Center w={'full'}>
   <SimpleGrid 
   width={['335px','400px']}
   columns={1}
   >
        <Fade direction="up" triggerOnce={true}> <GridItem mb={'15px'} colSpan={1} >
       <Box w={'full'} display={'flex'} justifyContent={'Center'}>
       <Box  height='49px'
    width='51px' >
  <Image src='/image/success.svg'
    alt='Bebo' />
</Box></Box>
        </GridItem></Fade>
       
        <GridItem mb={'24px'} textAlign={'center'} colSpan={1}>
            <Text color={'#021D17'} fontWeight={'600'} fontSize={["32px",'40px']}> 
            Success
            </Text>
            </GridItem>
            <GridItem mb={'40px'} textAlign={'center'} colSpan={1}>
            <Text color={'#666666'} fontWeight={'600'} fontSize={["16px",'18px']} >
            Transaction successfully  initiated awaiting confirmation
            </Text>
            </GridItem>
            {/* <GridItem colSpan={1} mt={"4px"}>
            <Button
              bg="#0CBF94"
              fontSize={"16px"}
              fontWeight={"600"}
              w={"100%"}
              color={'#021D17'}
             onClick={()=>{
                Router.push('/')
             }}
            >
             <MdHome size={'80%'}  color={'white'}/>
            </Button>
          </GridItem> */}
    </SimpleGrid>
   </Center>
   </Box>
  )
}
