import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useCryptoContext } from '../drawer/Buy/usecontextbuy';

export  function ButtonForBuy({onOpen,loading}:{onOpen:any,loading:any}) {
 
  return (
    <div> <Button onClick={onOpen}
    bg="#0CBF94"
    fontSize={"16px"}
    fontWeight={"600"}
    w={"100%"}
    color={'#021D17'}
    h={['50px','50px','44px']}
    isDisabled={loading===''}
  >
Get bank account details
</Button></div>
  )
}
export  function ButtonForsell({onOpen}:{onOpen:any}) {
  const {
    userId,
    setaccountName,
    setbankName,
    setaccountNumber,
    setaccountid,
    accountid
  } = useCryptoContext();
  return (
    <div>
      {" "}
      <Button
        onClick={onOpen}
        bg="#0CBF94"
        fontSize={"16px"}
        fontWeight={"600"}
        w={"100%"}
        color={"#021D17"}
        h={["50px", "50px", "44px"]}
        isDisabled={userId===null}
      >Get wallet address
      </Button>
    </div>
  );
}