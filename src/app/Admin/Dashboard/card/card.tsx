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
import { useAdminContext } from "../../Admincontext";

export default function Bard() {

  const { NetValue, currentSlice, setNetValue} = useAdminContext();
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
  const { NetValue, currentSlice, setNetValue, getnetwork} = useAdminContext();
  return (
    <SimpleGrid pb={'19px'} spacing={4}>
    <Card
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      cursor="pointer"
      transition="transform 0.5s ease-in-out, background-color 0.7s ease"
    >

      <CardBody>
        <HStack mb={"32px"} justifyContent={"space-between"}>
          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="700">
            Live rates
          </Text>
          <Button bg={"#186B53"} onClick={()=>getnetwork()}>
            <Text
              fontSize={{ base: "13px", md: "15px" }}
              fontWeight="500"
              color={"#FFFFFF"}
              _hover={{ color: 'black' }}
            >
              Update rates
            </Text>
          </Button>
        </HStack>
        
        <HStack w={'full'} spacing={4} flexDirection={{ base: 'column', md: 'row' }}>
        {currentSlice.map((item: any, index: any) => (
  <React.Fragment key={index}>
    <SimpleGrid columns={{ base: 1, md: 5 }} w={'full'} spacing={4}>
      <GridItem colSpan={{ base: 1, md: 2 }} display={'flex'} justifyContent={'start'}>
        <HStack>
          <Image
            boxSize='20px'
            borderRadius='full'
            src={item.image || "/image/crypto.png"} // Use the dynamic image or fallback
            alt={item.name || 'Crypto Image'}       // Use dynamic name or fallback
            mr='12px'
          />
          <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="700">
            {item.symbol}  {/* Dynamic symbol */}
          </Text>
        </HStack>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }} display={'flex'} justifyContent={'end'}>
        <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="700">
          {item.current_price} {/* Dynamic current price */}
        </Text>
      </GridItem>
    </SimpleGrid>

    {/* Optional Divider between the two slices */}
    {index < currentSlice.length - 1 && (
      <Box>
        <Divider orientation='vertical' h={'50px'} borderWidth="2px" color={'#E6E6E6'} />
      </Box>
    )}
  </React.Fragment>
))}

        </HStack>
      </CardBody>
    </Card>
  </SimpleGrid>
  );
}


