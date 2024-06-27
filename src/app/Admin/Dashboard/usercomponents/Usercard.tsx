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
import React from 'react'

export default function Usercard() {
  const data = [
    {
      title: 'total sign ups',
      number: '3,493',
    },
    {
      title: 'total revenue',
      number: '$1,500,200,426',
    },
    {
      title: 'today active users',
      number: '25',
    },
  ];
  return (
   <Box w={'100%'} mb={'24px'}>
   <VStack gap={'26px'} w={'100%'}>
    <Box display={'flex'} textAlign={'left'} w={'full'}>
<Text fontSize={'16px'} fontWeight={'700'}>Users</Text>
    </Box>
    <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={6} width="100%">
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
