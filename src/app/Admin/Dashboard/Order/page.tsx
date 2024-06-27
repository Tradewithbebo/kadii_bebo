import { Box } from '@chakra-ui/react'
import React from 'react'

import OrderCard from '../OrderComponents/OrderCard'
import Ordersearch from '../OrderComponents/OrderSearch'
import Order_Table from '../OrderComponents/Order_Table'

export default function page() {
  return (
    <Box mb={'24px'}><OrderCard/>
    <Ordersearch/>
    <Order_Table /></Box>
  )
}
