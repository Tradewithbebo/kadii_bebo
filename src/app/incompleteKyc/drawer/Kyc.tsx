import Bvn from '@/app/Kyc/Bvn/Bvn'
import Kkyc from '@/app/Kyc/Kyc/page'
import { Box, Button,Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, Link, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { SlArrowLeft } from "react-icons/sl";

export default function Kyc({isOpen,onClose,}:{isOpen:any,onClose:any} ) {
  return (
    <div> 
  <Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
    size={['sm','sm']} 
  //   finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent>
        <Link href='/'> <DrawerCloseButton /></Link>
     <Box pt={['30px','0px']}> <Kkyc/></Box>
    </DrawerContent>
  </Drawer>
</div>
  )
}
{/* <DrawerCloseButton />
      <DrawerHeader>Create your account</DrawerHeader>

      <DrawerBody>
        <Input placeholder='Type here...' />
      </DrawerBody>

      <DrawerFooter>
        <Button variant='outline' mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme='blue'>Save</Button>
      </DrawerFooter> */}