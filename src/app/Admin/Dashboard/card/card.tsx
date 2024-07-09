import React from "react";
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
  Image
} from "@chakra-ui/react";

export default function Bard() {
  // const columns = useBreakpointValue({ base: 1, md: 2, lg: 4 });
  const data = [
    {
      title: 'total number payout',
      number: '10.928',
    },
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
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} width="100%">
        {data.map((item, index) => (
          <Card
          border="1px" borderColor="gray.200" borderRadius="md"
            key={index}
            cursor="pointer"
            bg={index === 0 ? "#186B53" : "white"}
            _hover={{
              bg:index === 0 ? "#186B53" : "#ECECEC",
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
  );
}
export function Bardtwo() {
  // const columns = useBreakpointValue({ base: 1, md: 2, lg: 4 });

  return (
    <SimpleGrid pb={'19px'}>
      
      <Card
      border="1px" borderColor="gray.200" borderRadius="md"
        cursor="pointer"
        transition="transform 0.5s ease-in-out, background-color 0.7s ease"
      >
        <CardBody>
          <HStack mb={"32px"} justifyContent={"space-between"}>
            <Box>
              {" "}
              <Text fontSize="16px" fontWeight="700">
                Live rates
              </Text>
            </Box>
            <Box>
              {" "}
              <Button bg={"#186B53"}>
                <Text fontSize="15px" fontWeight="500" color={"#FFFFFF"}  _hover={
                {
                  color:'black'
                }
              } >
                  Update rates
                </Text>
              </Button>
            </Box>
          </HStack>
          <HStack  w={'full'}>
          <SimpleGrid columns={[1,5]} w={'full'}>
  
  <GridItem colSpan={2}  display={'flex'} justifyContent={'start'}>
    <HStack>
    <Box>
    <Image
       boxSize='20px'
       borderRadius='full'
       src="/image/crypto.png"
       alt='Simon the pensive'
       mr='12px'
       />
 </Box>
 <Box>
 <Text fontSize="18px" fontWeight="700">Tether USD</Text>
 </Box>
    </HStack>
  </GridItem>
  <GridItem colSpan={3} display={'flex'} justifyContent={'end'}>
  <Text fontSize="18px" fontWeight="700">1033.5</Text>
</GridItem>
</SimpleGrid>
  <Box> <Divider orientation='vertical'  h={'50px'}  borderWidth="2px" color={'#E6E6E6'}/></Box>
  <SimpleGrid columns={[1,5]}  w={'full'}>
  
  <GridItem colSpan={2}  display={'flex'} justifyContent={'start'}>
    <HStack>
    <Box>
    <Image
     boxSize='20px'
     borderRadius='full'
     src="/image/crypto.png"
     alt='Simon the pensive'
     mr='12px'
     />
 </Box>
 <Box>
 <Text fontSize="18px" fontWeight="700">BTC</Text>
 </Box>
    </HStack>
  </GridItem>
  <GridItem colSpan={3} display={'flex'} justifyContent={'end'}>
  <Text fontSize="18px" fontWeight="700">1033.5</Text>
</GridItem>
</SimpleGrid>
          </HStack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}
