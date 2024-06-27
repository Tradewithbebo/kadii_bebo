'use client'
import {
  Box,
  Tbody,
  Td,
  Thead,
  Tr,
  Table,
  Th,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoCopyOutline, IoFilterSharp } from "react-icons/io5";
import { MdCircle } from "react-icons/md";

export default function TAble({
  headers,
  data,
  bank,
}: {
  headers: any;
  data: any;
  bank: any;
}) {
  const toast = useToast()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard.",
          description: `Copied: ${text}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <>
      <Box
        pb={"10px"}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        borderTopRightRadius={"none"}
        borderTopLeftRadius={"none"}
        borderTop={"none"}
      >
        <Table>
          <Thead>
            <Tr>
              {headers.map((header: any, index: any) => (
                <Th
                  key={index}
                  color={"#000000"}
                  fontSize={"10px"}
                  fontWeight={"700"}
                >
                  {header}{" "}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {data.map((row: any, rowIndex: any) => (
              <Tr key={rowIndex}>
                {Object.values(row).map((value: any, cellIndex) => (
                  <Td
                    // w={cellIndex === 3 ? "100%" : ""}
                    key={cellIndex}
                    color={
                      cellIndex === 2 && value == "Sell order"
                        ? "#D42620"
                        : cellIndex === 2 && value == "Buy order"
                        ? "#0F973D"
                        : "#000000"
                    } // Conditional color
                    fontSize={"12px"}
                    fontWeight={"600"}
                    //   bg={cellIndex === 2 ? 'yellow.200' : 'transparent'}  // Conditional background color
                  >
                    {cellIndex === 1 && value == "Completed" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#C7EED5"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#2F7F37" />
                          <Text
                            color="#2F7F37"
                            fontSize={"12px"}
                            fontWeight={"500"}
                          >
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : cellIndex === 1 && value == "" ? (
                      <Box rounded={"10px"} px={"2px"} bg={"#FCF2C1"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#B59803" />
                          <Text color={"#B59803"} fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : cellIndex === 1 && value == "Declined" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#FF48341A"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#FF4834" />
                          <Text color="#FF4834" fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : (
                      value
                    )}
                    {cellIndex === 3  && (
                    <HStack><Text color={'#71717A'} fontSize={'9px'} fontWeight={'500'}>
                    {bank[rowIndex]}
                  </Text> <Box as="button"
                          onClick={() => handleCopy(bank[rowIndex])}><IoCopyOutline/></Box></HStack>
                  )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
