import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import TAble from "./Table";
import { GrStatusGood } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";

export default function Dashboardcomponent() {
  const headers = [
    // eslint-disable-next-line react/jsx-key
    <GrStatusGood size={'20px'}/>,
    "Status",
    "Order Type",
    "Customers’ Info",
    "Asset Amount Received",
    "Amount to be Sent",
    "Date",
  ];

  const data = [
    {
      icon: <GrStatusGood size={'20px'}/>,
      status: "Completed",
      orderType: "Sell order",
      customerInfo: "MATTHEW OLA",
      assetAmountReceived: '200,000.04 USDT',
      amountToBeSent: 'NGN 2,000,000,000.00',
      date: "22/06/23  12:23PM",
    },
    {
      icon: <GrStatusGood size={'20px'}/>,
      status: "Completed",
      orderType: "Sell order",
      customerInfo: "MATTHEW OLA",
      assetAmountReceived: '200,000.04 USDT',
      amountToBeSent: 'NGN 2,000,000,000.00',
      date: "22/06/23  12:23PM",
    },
    {
      icon: <GrStatusGood size={'20px'}/>,
      status: "Completed",
      orderType: "Buy order",
      customerInfo: "MATTHEW OLA",
      assetAmountReceived: '200,000.04 USDT',
      amountToBeSent: 'NGN 2,000,000,000.00',
      date: "22/06/23  12:23PM",
    },
    // Add more data as needed
  ];
  const bank=[
    '3092764731 | FIRSTBANK PLC',
    ' 3088908714 | FIRSTBANK PLC',
    '3092764731 | FIRSTBANK PLC'
    ]
  return (
    <Box mt={"24px"} w={"100%"} mb={'19px'}>
      <Card  
      border="1px" borderColor="gray.200" borderRadius="md"
      borderBottomRightRadius={"none"}
        borderBottomLeftRadius={"none"}
        cursor="pointer"
        transition="transform 0.5s ease-in-out, background-color 0.7s ease"
        w={"100%"}
      >
        <CardBody>
          <SimpleGrid columns={[1, 6]} w={"full"} columnGap={"7px"}>
            <GridItem colSpan={1}>
              <Text fontWeight={"700"} fontSize={"16px"}>
                New orders
              </Text>
            </GridItem>
            <GridItem
              colSpan={[1, 2]}
              display={"flex"}
              justifyContent={"start"}
            >
              <HStack>
                <Box>
                  <Button bg={"#b3ecca"} fontWeight={"700"} fontSize={"13px"}>
                    Buy
                  </Button>
                </Box>

                <Box>
                  {" "}
                  <Button bg={"#b3ecca"} fontWeight={"700"} fontSize={"13px"}>
                    Sell
                  </Button>
                </Box>
              </HStack>
            </GridItem>
            <GridItem colSpan={[1, 3]} display={"flex"} justifyContent={"end"}>
              <Box>
                <Link color={"#4F46E5"} fontWeight={"500"} fontSize={"12px"}>
                 <HStack> <Text>See All Order</Text> <IoIosArrowForward /></HStack>
                </Link>
              </Box>
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>
      <TAble headers={headers} data={data} bank={bank}/>
    </Box>
  );
}
