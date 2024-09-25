"use client";

import {
  Box,
  Text,
  Tbody,
  Td,
  Thead,
  Tr,
  Table,
  Th,
  HStack,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoFilterSharp } from "react-icons/io5";
import {
  MdCircle,
} from "react-icons/md";
import { useAdminContext } from "../../Admincontext";

export default function TransactionTable({
  headers,
  data,
  bank,
}: {
  headers: any;
  data: any;
  bank: any;
}) {

  const {transaction } = useAdminContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed

  const totalPages = Math.ceil(data.length / itemsPerPage);
  
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
                    color={"#000000"}
                    fontSize={"12px"}
                    fontWeight={"600"}
                  >
                    {cellIndex === 0 && value === "buy" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#C7EED5"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#2F7F37" />
                          <Text
                            color="#2F7F37"
                            fontSize={"12px"}
                            fontWeight={"500"}
                          >
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : cellIndex === 0 && value === "In-progress" ? (
                      <Box
                        rounded={"10px"}
                        px={"2px"}
                        bg={"#FCF2C1"}
                        w={"100%"}
                      >
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#B59803" />
                          <Text color={"#B59803"} fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : cellIndex === 0 && value === "sell" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#FF48341A"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#FF4834" />
                          <Text color="#FF4834" fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) :  cellIndex === 5 ?null  : (
                      value
                    )}
                    {cellIndex === 1 && (
                      <Text
                        color={"#71717A"}
                        fontSize={"10px"}
                        fontWeight={"500"}
                      >
                        {bank[rowIndex]}
                      </Text>
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
      </Box>
    </>
  );
}
