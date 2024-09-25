import {
  Box,
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Link
} from "@chakra-ui/react";
import React from "react";
import Search, { Search2 } from "./Search";
import { IoOptionsOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
// import Link from "next/link";

export default function Transactionsearch() {
  return (
    <Box width={"100%"}>
      <Card
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        borderBottomRightRadius={"none"}
        borderBottomLeftRadius={"none"}
        cursor="pointer"
        // transition="transform 0.5s ease-in-out, background-color 0.7s ease"
        w={"100%"}
      >
        <CardBody>
          <SimpleGrid columns={[1, 6]}>
            <GridItem colSpan={[1, 2]} w={"full"}>
              <VStack w={"full"} display={"Flex"}>
                <Box display={"flex"} justifyContent={"start"} w={"full"}>
                  <Text
                    fontSize={"16px"}
                    fontWeight={"700"}
                    w={"full"}
                    justifyContent={"start"}
                  >
                    Transactions
                  </Text>
                </Box>
                <Box display={"flex"} justifyContent={"start"} w={"full"}>
                  <Text
                    fontSize={"14px"}
                    fontWeight={"500"}
                    w={"full"}
                    justifyContent={"start"}
                    color={"#71717A"}
                  >
                    Attend to active tickets as fast as possible
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem colSpan={[1, 2]} pr={'24px'} pt={'10px'}>
            <Box  display={"flex"} justifyContent={"end"} w={"full"} alignItems={'center'}>
                <Link color={"#4F46E5"} fontWeight={"500"} fontSize={"12px"}>
                  <HStack>
                    {" "}
                    <Text>Filter by</Text> <IoIosArrowForward />
                  </HStack>
                </Link>
              </Box>
            </GridItem>
            <GridItem colSpan={[1, 2]}>
              <Search2 placeholder={"Type to search"} />
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
}
