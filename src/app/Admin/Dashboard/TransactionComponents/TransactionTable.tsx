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
import { IoFilterSharp } from "react-icons/io5";
import { MdCircle } from "react-icons/md";
import { useAdminContext } from "../../Admincontext";

interface TransactionTableProps {
  headers: string[];
  data: any[];
  bank: string[];
}

export default function TransactionTable({
  headers,
  data,
  bank,
}: TransactionTableProps) {
  const { transaction } = useAdminContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
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

  return (
    <Box
      pb="10px"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      borderTopRadius="none"
      borderTop="none"
    >
      <Table>
        <Thead>
          <Tr  cursor="pointer"
              _hover={{ backgroundColor: "gray.50" }}>
            {headers.map((header: string, index: number) => (
              <Th
                key={index}
                color="#000000"
                fontSize="10px"
                fontWeight="700"
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
          {currentData.map((row: any, rowIndex: number) => (
            <Tr key={rowIndex} cursor="pointer"
            _hover={{ backgroundColor: "gray.50" }}>
              {Object.values(row).map((value: any, cellIndex: number) => (
                <Td
                  key={cellIndex}
                  color="#000000"
                  fontSize="12px"
                  fontWeight="600"
                >
                  {cellIndex === 0 ? (
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
                  ) : cellIndex === 5 ? null : (
                    value
                  )}
                  {cellIndex === 1 && (
                    <Text
                      color="#71717A"
                      fontSize="10px"
                      fontWeight="500"
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
      <Flex justifyContent="space-between" mt={4} mx="10px">
        <Button
          onClick={handlePrev}
          isDisabled={currentPage === 1}
          color="#3F3F46"
          fontWeight="500"
          fontSize="13px"
          bg="#0CBF94"
        >
          Previous
        </Button>
        <Text
          color="#3F3F46"
          fontWeight="500"
          fontSize="13px"
          textAlign="center"
          justifyContent="center"
          w="full"
          display="flex"
          alignItems="center"
        >
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={handleNext}
          isDisabled={currentPage === totalPages}
          color="#3F3F46"
          fontWeight="500"
          fontSize="13px"
          bg="#0CBF94"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}