'use client';
import {
  Box,
  Tbody,
  Td,
  Thead,
  Tr,
  Table,
  Th,
  HStack,
  Button,
  Flex,
  Text,
  useToast,
  TableContainer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoCopyOutline, IoFilterSharp } from "react-icons/io5";
import { MdCircle } from "react-icons/md";

export default function TransactionTable({
  headers,
  data,
  bank,
}: {
  headers: any;
  data: any;
  bank: any;
}) {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'buy':
        return { bg: "#C7EED5", color: "#2F7F37" };
      case 'in-progress':
        return { bg: "#FCF2C1", color: "#B59803" };
      case 'sell':
        return { bg: "#FF48341A", color: "#FF4834" };
      default:
        return { bg: "transparent", color: "#000000" };
    }
  };
  // Handle copying bank details
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

  // Get the current items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <TableContainer
        pb={"10px"}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        borderTopRightRadius={"none"}
        borderTopLeftRadius={"none"}
        borderTop={"none"}
        w={"full"}  
      >
        <Table>
          <Thead>
            <Tr>
              {headers.map((header: any, index: any) => (
                <Th
                key={index}
                color={"#000000"}
                fontSize={"12px"}
                fontWeight={"700"}
                padding="10px" 
                >
                  {header}{" "}
                  {header === "KYC Level" && (
                    <IoFilterSharp
                      style={{ display: "inline", marginLeft: "8px" }}
                    />
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {currentData.map((row: any, rowIndex: any) => (
              <Tr key={rowIndex}>
                {Object.values(row).map((value: any, cellIndex) => (
                   <Td
                   key={cellIndex}
                   color={
                     cellIndex === 1 && value == "sell"
                       ? "#D42620"
                       : cellIndex === 1 && value == "buy"
                       ? "#0F973D"
                       : "#000000"
                   }
                   fontSize={"12px"}
                   fontWeight={"600"}
                  //  width={cellIndex === 3 ? "100%" : "40px"}  // Making the third cell larger
                   maxWidth={cellIndex === 2 ? "200px" : "auto"}  // Optional: set a max width
                 >
                   {cellIndex === 0 && value === "FAILED" ? (
                    <Box
                    rounded="10px"
                    px={{ base: "2px", sm: "5px", md: "10px" }}
                    py={"2px" }
                    bg="#FF48341A"
                    w={'fit-content'}
                  >
                    <HStack gap={{ base: "1px", sm: "3px", md: "5px" }}>
                      <MdCircle size="10px" color="#FF4834" />
                      <Text
                        color="#FF4834"
                        fontSize={ "12px"}
                      >
                        {value}
                      </Text>
                    </HStack>
                  </Box>
                   ):cellIndex === 0 && value === "COMPLETED" ? (
                    <Box
                    rounded="10px"
                    px={{ base: "2px", sm: "5px", md: "10px" }}
                    bg="#DCFCE7"
                    w={"fit-content"}
                  >
                    <HStack gap={{ base: "1px", sm: "3px", md: "5px" }}>
                      <MdCircle size="10px" color="#2F7F37" />
                      <Text
                        color="#2F7F37"
                        fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                        fontWeight="500"
                      >
                        {value}
                      </Text>
                    </HStack>
                  </Box>
                   ) : cellIndex === 0 && value === "PENDING" ? (
                    <Box
                    rounded="10px"
                    px={{ base: "2px", sm: "5px", md: "10px" }}
                    py={"2px" }
                    bg="#FCF2C1"
                    w={'fit-content'}
                  >
                    <HStack gap={{ base: "1px", sm: "3px", md: "5px" }}>
                      <MdCircle size="10px" color="orange" />
                      <Text
                        color="orange"
                        fontSize={ "12px"}
                      >
                        {value}
                      </Text>
                    </HStack>
                  </Box>

                   ):cellIndex === 1 ? (
                    <Box
                      rounded="10px"
                      px="5px"
                      bg={getStatusStyle(value as string).bg}
                      display="inline-block"
                    >
                      <HStack gap="3px">
                        <MdCircle size="10px" color={getStatusStyle(value as string).color} />
                        <Text
                          color={getStatusStyle(value as string).color}
                          fontSize="12px"
                          fontWeight="500"
                        >
                          {value}
                        </Text>
                      </HStack>
                    </Box>
                   ) : cellIndex === 6 ? null :  
                   (
                     value
                   )}
                   {cellIndex === 2 && (
                     <HStack >
                       <Text
                         color={"#71717A"}
                         fontSize={"9px"}
                         fontWeight={"500"}
                       >
                         {bank[rowIndex]?.display}
                       </Text>
                       <Box
                         as="button"
                         onClick={() => handleCopy(bank[rowIndex])}
                       >
                         <IoCopyOutline />
                       </Box>
                     </HStack>
                   )}
                 </Td>
                 
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Pagination Buttons */}
        <Flex justifyContent="space-between" mt={4} mx={"10px"}>
          <Button
            onClick={handlePrev}
            isDisabled={currentPage === 1}
            color={"#3F3F46"}
            fontWeight={"500"}
            fontSize={"13px"}
            bg={"#0CBF94"}
          >
            Previous
          </Button>
          <Text
            color={"#3F3F46"}
            fontWeight={"500"}
            fontSize={"13px"}
            textAlign={"center"}
            justifyContent={"center"}
            w={"full"}
            display={"flex"}
            alignItems={"center"}
          >
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={handleNext}
            isDisabled={currentPage === totalPages}
            color={"#3F3F46"}
            fontWeight={"500"}
            fontSize={"13px"}
            bg={"#0CBF94"}
          >
            Next
          </Button>
        </Flex>
      </TableContainer>
    </>
  );
}
