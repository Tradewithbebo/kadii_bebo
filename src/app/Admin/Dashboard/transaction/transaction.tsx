

import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Text,
  Flex,
  Button,
  Container,
} from "@chakra-ui/react";
export default function Transaction() {
  return (
    <Container>
      <TableContainer bg="#182237" p="20px" borderRadius="10px">
        <Table width={"100%"} p={"10px"}>
          <TableCaption
            placement="top"
            marginBottom={"20px"}
            fontWeight={"200px"}
            color={"#b7bac1"}
          >
            Latest Transactions{" "}
          </TableCaption>
          <Thead textAlign="left" p={"10px"}>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td py={"10px"}>
                <Flex gap={3}>
                  {" "}
                  <Image
                    borderRadius={"50%"}
                    boxSize="40px"
                    objectFit="cover"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                    display={["none", "block"]}
                  />
                  John Doe
                </Flex>
              </Td>
              <Td>
                <Button bg={"#f7cb7375"} padding={"5px"} borderRadius={"5px"}>
                  Pending
                </Button>
              </Td>

              <Td isNumeric>14.02.024</Td>
              <Td isNumeric>$3.200</Td>
            </Tr>
            <Tr>
              <Td py={"10px"}>
                <Flex gap={3}>
                  {" "}
                  <Image
                    boxSize="40px"
                    objectFit="cover"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                    borderRadius={"50%"}
                    display={["none", "block"]}
                  />
                  John Doe
                </Flex>
              </Td>
              <Td>
                <Button bg={"#afd6ee75"} padding={"5px"} borderRadius={"5px"}>
                  Done
                </Button>
              </Td>

              <Td isNumeric>14.02.024</Td>
              <Td isNumeric>$3.200</Td>
            </Tr>
            <Tr>
              <Td py={"10px"}>
                <Flex gap={3}>
                  {" "}
                  <Image
                    boxSize="40px"
                    objectFit="cover"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                    borderRadius={"50%"}
                    display={["none", "block"]}
                  />
                  John Doe
                </Flex>
              </Td>
              <Td>
                <Button bg={"#f7737375"} padding={"5px"} borderRadius={"5px"}>
                  Cancelled
                </Button>
              </Td>

              <Td isNumeric>14.02.024</Td>
              <Td isNumeric>$3.200</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
