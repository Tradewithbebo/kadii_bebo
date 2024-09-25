"use client";

import { Box, Text, Tbody, Td, Thead, Tr, Table, Th, HStack, Button, Flex, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoFilterSharp, IoCopyOutline } from "react-icons/io5";
import { MdGppGood, MdCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function TAbleuser({
  headers,
  data,
  // bank
}: {
  headers: any;
  data: any;
  // bank: any;
}) {
  const toast = useToast();
  const Router = useRouter();
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
        <Table variant="simple">
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
                    color={
                      cellIndex === 2 && value === "NOT-STARTED"
                        ? "#B59803"
                        : value === "PENDING"
                        ? "ORANGE"
                        : value === "APPROVED"
                        ? "#2F7F37"
                         : value === "REJECTED"
                        ? "#FF4834"
                        : "#000000"
                    }
                    fontSize={"12px"}
                    fontWeight={"600"}
                  >
                    {cellIndex === 0 ? (
                      <Box
                        cursor={"pointer"}
                        onClick={() => Router.push("/Admin/Dashboard/User/1")}
                      >
                        {value}
                      </Box>
                    ) : (
                      value
                    )}

                    {cellIndex === 2 && (
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

                    {/* {cellIndex === 0 && ( */}
                    {/* <HStack> */}
                    {/* <Text color={'#71717A'} fontSize={'9px'} fontWeight={'500'}> */}
                    {/* {bank[rowIndex]} */}
                    {/* </Text> */}
                    {/* <Box as="button" onClick={() => handleCopy(bank[rowIndex])}>
                          <IoCopyOutline />
                        </Box> */}
                    {/* </HStack> */}
                    {/* )} */}
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
