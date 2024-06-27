import { Box } from '@chakra-ui/react'
import React from 'react'
import TransactionCard from '../TransactionComponents/TransactionCard'
import Transactionsearch from '../TransactionComponents/Transactionsearch'
import TransactionTable from '../TransactionComponents/TransactionTable'
import Transaction_Table from '../TransactionComponents/Transaction_Table'

export default function page() {
  return (
    <Box mb={'24px'}><TransactionCard/>
    <Transactionsearch/>
    <Transaction_Table /></Box>
  )
}
