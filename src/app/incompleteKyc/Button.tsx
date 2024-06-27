import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Kyc from './drawer/Kyc'

export default function Buttons() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
   
    <div>
         <Kyc isOpen={isOpen} onClose={onClose }/>
        <Button w={'100%'} bg={'#0CBF94'} onClick={onOpen} >Complete KYC</Button>
        </div>
  )
}
