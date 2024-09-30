'use client'

import {
  Card,
  CardBody,
  Text,
  Box,
  SimpleGrid,
  useBreakpointValue,
  HStack,
  Button,
  Divider,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from 'react'

export default function OrderCard() {
    const [Month,setMonth]=useState('All time')
    const change=(NoMonths:any)=>{
        setMonth(NoMonths)
    }
    const NoMonths=
       [ 'All time',
        '12 Months',
        '6 Months',
        '30 Days',
        '7 Days'
       ]

   
  const data = [
    {
      title: 'Today’s Sale',
      number: '$1,820,426',
    },
    {
      title: 'Total received in USD',
      number: '$504,308,485.09',
    },
    {
      title: 'Total payout',
      number: '$292,677,898.86',
    },
    {
        title: 'RIDERs payout',
        number: '23,033,493',
      },
  ];
  return (
   <Box w={'100%'} mb={'24px'}>
   <VStack gap={'26px'} w={'100%'}>
 <HStack w={'full'} justifyContent={'space-between'} display={'flex'}>   <Box display={'flex'} w={'full'}>

<Text fontSize={'16px'} fontWeight={'700'}>Transactions</Text>
    </Box>
    <Box display={'flex'}w={'full'} justifyContent={'right'} >
   <HStack gap={'20px'}>
          {NoMonths.map((month, index) => (
            Month === month ? (
              <Button
              bg={'white'}
                fontSize={'11px'}
                fontWeight={'700'}
                color={'#71717A'}
                key={index}
                border={'1px'}
                size={'sm'}
              >
                {month}
              </Button>
            ) : (
              <Text
              cursor={'pointer'}
              onClick={()=>change(month)}
                fontSize={'11px'}
                fontWeight={'700'}
                color={'#71717A'}
                key={index}
              >
                {month}
              </Text>
            )
          ))}
        </HStack>
    </Box>
  </HStack>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} width="100%">
        {data.map((item, index) => (
          <Card
          border="1px" borderColor="gray.200" borderRadius="md"
            key={index}
            cursor="pointer"
            // bg={index === 0 ? "#186B53" : "white"}
            _hover={{
              bg: "#ECECEC",
              transform: "scale(1.1)",
            }}
            transition="transform 0.5s ease-in-out, background-color 0.7s ease"
          >
            <CardBody>
              <Box>
                <Text fontSize="11px" fontWeight="500" color={'#71717A'}>
                  {item.title}
                </Text>
                <Text fontSize="18px" fontWeight="700">
                  {item.number}
                </Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
   </VStack>
   
   </Box>
  )
}
