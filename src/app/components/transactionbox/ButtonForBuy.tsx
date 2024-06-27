import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function ButtonForBuy({onOpen}:{onOpen:any}) {
  return (
    <div> <Button onClick={onOpen}
    bg="#0CBF94"
    fontSize={"16px"}
    fontWeight={"600"}
    w={"100%"}
    color={'#021D17'}
   
  >
Get bank account details
</Button></div>
  )
}
