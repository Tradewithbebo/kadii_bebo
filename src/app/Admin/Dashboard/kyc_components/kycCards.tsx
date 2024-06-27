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
  Link,
} from "@chakra-ui/react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutline10K } from "react-icons/md";
import { IoOptionsOutline } from "react-icons/io5";

export default function KycCards() {
  const data = [
    {
      title: "total sign ups",
      number: "3,493",
    },
    {
      title: "total revenue",
      number: "$1,500,200,426",
    },
    {
      title: "today active users",
      number: "25",
    },
  ];
  return (
    <Box w={"100%"} mb={"24px"}>
      <VStack gap={"26px"} w={"100%"}>
        <Box display={"flex"} textAlign={"left"} w={"full"}>
          <Text fontSize={"16px"} fontWeight={"700"}>
            KYC & Verification
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 3 }}
          spacing={6}
          width="100%"
        >
          {data.map((item, index) => (
            <Card
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
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
                  <Text fontSize="11px" fontWeight="500" color={"#71717A"}>
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
  );
}

export function KycCardstwo() {
  return (
    <Box w={"100%"}>
      {" "}
      <Card
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        borderBottomRightRadius={"none"}
        borderBottomLeftRadius={"none"}
        cursor="pointer"
        transition="transform 0.5s ease-in-out, background-color 0.7s ease"
        w={"100%"}
      >
        <CardBody>
          <SimpleGrid columns={[1, 6]} w={"full"} columnGap={"7px"}>
            <GridItem display="flex" colSpan={3} w={"full"}>
              <VStack gap={"4px"}>
                <Box w={'full'} display={'flex'} justifyContent={'start'}>
                  <Text fontWeight={"700"} fontSize={"16px"} >
                    KYC & Verification
                  </Text>
                </Box>
                <Box w={'full'} display={'flex'} justifyContent={'start'}>
                  <Text fontWeight={"400"} fontSize={"12px"} color={"#8B8B8B"}>
                    Attend to active tickets as fast as possible
                  </Text>
                </Box>
              </VStack>
            </GridItem>

            <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"end"}>
              <HStack>
              <Box>
                <Link color={"#4F46E5"} fontWeight={"500"} fontSize={"12px"}>
                  <HStack>
                    {" "}
                    <Text>Filter by</Text> <IoIosArrowForward />
                  </HStack>
                </Link>
              </Box>
              <Box>
                <Link color={"#4F46E5"} fontWeight={"500"} fontSize={"12px"}>
                  <HStack>
                    {" "}
                    <Text>Sort by</Text> <IoOptionsOutline />
                  </HStack>
                </Link>
              </Box>
              </HStack>
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
}
