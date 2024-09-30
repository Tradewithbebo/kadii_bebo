import { Box, Card, CardBody, GridItem, SimpleGrid,Text } from '@chakra-ui/react'
import React from 'react'
import Search from './Adminsearch'


export default function Usersearch() {
  return (
    <Box width={'100%'}>
       <Card  
      border="1px" borderColor="gray.200" borderRadius="md"
      borderBottomRightRadius={"none"}
        borderBottomLeftRadius={"none"}
        cursor="pointer"
        // transition="transform 0.5s ease-in-out, background-color 0.7s ease"
        w={"100%"}
      >
        <CardBody>
      <SimpleGrid columns={[1,4]}>
        <GridItem colSpan={[1,2]}>
       <Text fontSize={'16px'} fontWeight={'700'}>Users list</Text>
        </GridItem>
        <GridItem colSpan={[1,2]}>
        <Search placeholder={'Type to search'}/>
        </GridItem>

      </SimpleGrid>
      </CardBody>
      </Card>
    </Box>
  )
}
