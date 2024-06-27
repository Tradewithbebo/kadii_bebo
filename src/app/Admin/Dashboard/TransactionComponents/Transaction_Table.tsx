import { Box } from '@chakra-ui/react'
import React from 'react'
import TransactionTable from './TransactionTable'


const orderTypeColors = {
  "Type 1": "blue.500",
  "Type 2": "green.500",
  "Type 3": "red.500",
  // Add more types and colors as needed
};
const headers = [
 'Status',
  "Customers’ info",
  "Asset received",
  "Amount sent",
  'Date'
 
];

const data = [
  {
    Status: "In-progress",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: '200,000.04 USDT',
    Amount_sent:"NGN 2,000,000,000.00",
    Date: '22/06/23  12:23PM',

  },
  {
    Status: "In-progress",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: '200,000.04 USDT',
    Amount_sent:"NGN 2,000,000,000.00",
    Date: '22/06/23  12:23PM',

  },
  {
    Status: "Declined",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: '200,000.04 USDT',
    Amount_sent:"NGN 2,000,000,000.00",
    Date: '22/06/23  12:23PM',

  },
  {
    Status: "Completed",
    Customers_info: "MATTHEW OLA OLUKOJU",
    Asset_received: '200,000.04 USDT',
    Amount_sent:"NGN 2,000,000,000.00",
    Date: '22/06/23  12:23PM',

  },
  // Add more data as needed
];
const bank=[
'3092764731 | FIRSTBANK PLC',
' 3088908714 | FIRSTBANK PLC',
'3092764731 | FIRSTBANK PLC'
]

export default function Transaction_Table() {
    
  return (
   <Box>
    <TransactionTable headers={headers} data={data} bank={bank}/>
   </Box>
  )
}
