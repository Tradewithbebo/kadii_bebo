"use client";

import {
  Box,
  Image,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  // Link,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoCopyOutline, IoFilterSharp } from "react-icons/io5";
import { MdCircle, MdOpenInNew } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { AxiosAuthPost, AxiosGet, AxiosPost } from "@/app/axios/axios";
import Link from "next/link";

interface Transaction {
  [key: string]: any;
}

interface Bank {
  display: string;
  fullWalletAddress: string;
}

interface TransactionTableProps {
  headers: string[];
  data: Transaction[];
  bank: Bank[];
}

export default function TransactionTable({
  headers,
  data,
  bank,
}: TransactionTableProps) {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[ loading, setloading]=useState(false)
  const {
    isOpen: isOpenConfirmTrx,
    onOpen: onOpenConfirmTrx,
    onClose: onCloseConfirmTrx,
  } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [Trnx_id, setTrnx_id] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard.",
          description: `Copied: ${text}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleOpenModal = (transaction: Transaction, bankData: Bank) => {
    setSelectedTransaction(transaction);
    setSelectedBank(bankData);
    setTrnx_id(transaction.transaction_id || ""); // Set Trnx_id to the transaction_id
    onOpen();
  };

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

  const truncateFileName = (
    fileName: string | null | undefined,
    maxLength: number = 20
  ): string => {
    // Handle null or undefined fileName
    if (!fileName) return "";

    if (fileName.length <= maxLength) return fileName;

    const lastDotIndex = fileName.lastIndexOf(".");

    // If there's no dot or it's the first character, truncate without considering an extension
    if (lastDotIndex <= 0) {
      return `${fileName.substring(0, maxLength - 3)}...`;
    }

    const name = fileName.substring(0, lastDotIndex);
    const extension = fileName.substring(lastDotIndex + 1);

    // If name + extension is shorter than or equal to maxLength, return it as is
    if (name.length + extension.length + 1 <= maxLength) return fileName;

    // Calculate how much space we have for the name
    const availableLength = maxLength - extension.length - 4; // 4 for '....'

    // If we don't have enough space, truncate without the extension
    if (availableLength <= 0) {
      return `${fileName.substring(0, maxLength - 3)}...`;
    }

    // Truncate the name and add the extension
    return `${name.substring(0, availableLength)}...${extension}`;
  };
  let transactionId =Trnx_id
  
const url=`transactions/confirm/${transactionId}`
  const handleConffirmation = async () => {

    try {
      setloading(true)
      const res= await AxiosAuthPost(url,{})
      console.log('response',res)
      if( res){
       setloading(false)
        onOpenConfirmTrx();
        onClose();
      }
    }  catch (err: any) {
      setloading(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
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
        w={"full"}
      >
        <Table justifyContent="space-between" w={'full'}>
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th
                  key={index}
                  color={"#000000"}
                  fontSize={"10px"}
                  fontWeight={"700"}
                   padding="20px"
                      textAlign="left"
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
            {currentData.map((row, rowIndex) => (
              <Tr
                key={rowIndex}
                onClick={() => handleOpenModal(row, bank[rowIndex])}
                cursor="pointer"
              >
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <Td
                  key={cellIndex}
                  // color="#000000"
                  fontSize="12px"
                  fontWeight="600"
                    color={
                      key === "Transaction_type" && value === "sell"
                        ? "#D42620"
                        : key === "Transaction_type" && value === "buy"
                        ? "#0F973D"
                        : "#000000"
                    }
                    padding="20px"
                     maxWidth={key === "custo_name" ? "200px" : "auto"}
                  >
                    {key === "Status" && value === "Completed" ? (
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
                    ) : key === "Status" && value === "Incomplete" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#FF48341A"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#FF4834" />
                          <Text color="#FF4834" fontSize={"12px"}>
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) 
                    : key === "Status" && value === "completed" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#C7EED5"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#2F7F37" />
                          <Text color="#2F7F37" fontSize={"12px"}>
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    )
                    : key === "Status" && value === "pending" ? (
                      <Box rounded={"10px"} px={"5px"} bg={"#FCF2C1"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="ORANGE" />
                          <Text color="ORANGE" fontSize={"12px"}>
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    )
                    
                    : key === "Proof_of_payment" ? null : key ===
                      "timeInDays" ? null : key === "transaction_id" ? null : (
                      value
                    )}
                    {key === "custo_Name" && (
                     
                        <Text
                          color={"#71717A"}
                          fontSize={"9px"}
                          fontWeight={"500"}
                        >
                          {bank[rowIndex]?.display || "N/A"}
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

      {/* Modal for Transaction Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTransaction && selectedBank && (
              <Box>
                {Object.entries(selectedTransaction).map(([key, value]) => (
                  <HStack key={key} justifyContent="space-between" mb={2}>
                    <Text fontWeight="bold">{key}:</Text>
                    {key === "Proof_of_payment" ? (
                      <Link href={value as string}  color="blue.500" download >
                        <Button
                          rightIcon={<MdOpenInNew />}
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                        >
                          {truncateFileName(value as string)}
                        </Button>
                      </Link>
                    ) : (
                      <Text>{String(value)}</Text>
                    )}
                  </HStack>
                ))}

                <HStack justifyContent="space-between" mb={2}>
                  <Text fontWeight="bold">Bank:</Text>
                  <HStack>
                    <Text>{selectedBank.display}</Text>
                    <Button
                      onClick={() => handleCopy(selectedBank.fullWalletAddress)}
                      size="sm"
                      variant="ghost"
                      leftIcon={<IoCopyOutline />}
                    >
                      Copy
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => alert("Transaction Declined!")}
            >
              Decline Transaction
            </Button>
            <Button colorScheme="green" onClick={() => handleConffirmation()} isLoading={loading}>
              Confirm Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* modal for confirmtransaction */}
      <Modal isOpen={isOpenConfirmTrx} onClose={onCloseConfirmTrx} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack width={"full"} justifyContent={"center"} display={"flex"}>
              <Box
                width={"full"}
                justifyContent={"center"}
                display={"flex"}
                textAlign={"center"}
              >
                <Fade triggerOnce direction='up' >
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src="/image/Good.png"
                  alt="Dan Abramov"
                />
                </Fade>
              </Box>
              <Box
                width={"60%"}
                justifyContent={"center"}
                display={"flex"}
                textAlign={"center"}
              >
                You have successfully confirmed this transaction
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseConfirmTrx} w={"full"} bg={"#0CBF94"}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
