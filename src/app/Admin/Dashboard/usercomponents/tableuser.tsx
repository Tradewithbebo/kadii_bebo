'use client';

import { Box, Text, Tbody, Td, Thead, Tr, Table, Th, HStack, Button, Flex, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { MdGppGood } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAdminContext } from "../../Admincontext";

export default function TAbleuser({
  headers,
  data,
}: {
  headers: string[];
  data: any[];
}) {
  const toast = useToast();
  const router = useRouter();
  const { currentPage, 
    setCurrentPage } = useAdminContext();
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev:any) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev:any) => prev - 1);
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/Admin/Dashboard/User/${id}`);
  };

  return (
    <Box
      pb="10px"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      borderTopRightRadius="none"
      borderTopLeftRadius="none"
      borderTop="none"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
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
            <Tr 
              key={row._id} 
              onClick={() => handleRowClick(row._id)}
              cursor="pointer"
              _hover={{ backgroundColor: "gray.50" }}
            >
              {Object.entries(row).map(([key, value]: [string, any], cellIndex: number) => {
                if (key === '_id') return null; // Skip rendering the _id field
                return (
                  <Td
                    key={cellIndex}
                    color={
                      key === 'kycStatus'
                        ? value === "NOT-STARTED"
                          ? "#B59803"
                          : value === "PENDING"
                          ? "ORANGE"
                          : value === "APPROVED"
                          ? "#2F7F37"
                          : value === "REJECTED"
                          ? "#FF4834"
                          : "#000000"
                        : "#000000"
                    }
                    fontSize="12px"
                    fontWeight="600"
                  >
                    {value}
                    {key === 'kycStatus' && (
                      <MdGppGood
                        style={{
                          display: "inline",
                          marginLeft: "8px",
                          color:
                            value === "NOT-STARTED"
                              ? "#B59803"
                              : value === "PENDING"
                              ? "ORANGE"
                              : value === "APPROVED"
                              ? "#2F7F37"
                              : value === "REJECTED"
                              ? "#FF4834"
                              : "#000000",
                        }}
                      />
                    )}
                  </Td>
                );
              })}
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