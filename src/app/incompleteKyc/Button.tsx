import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Kyc from './drawer/Kyc'

export default function Buttons({onClosetwo}:{onClosetwo:any}) {
    const { isOpen:isOpenone, onOpen:onOpenone, onClose:onCloseone } = useDisclosure()
    const handleopen =()=>{{onOpenone()
      // onClosetwo()
    }}
  return (
   
    <div>
         <Kyc isOpenone={isOpenone} onCloseone={onCloseone}/>
        <Button w={'100%'} bg={'#0CBF94'} onClick={handleopen}>Complete KYC</Button>
        </div>
  )
}
