import { Box } from '@chakra-ui/react'
import React from 'react'
import KycCards, { KycCardstwo } from '../kyc_components/kycCards'
import Kyctabledata from '../kyc_components/Kyctabledata'

export default function page() {
  return (
    <Box mb={'24px'}>
        <KycCards/>
        <KycCardstwo/>
        <Kyctabledata/>
    </Box>
  )
}
