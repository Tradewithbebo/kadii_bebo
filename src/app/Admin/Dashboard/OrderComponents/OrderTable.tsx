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
  TableContainer,
  GridItem,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoCopyOutline, IoFilterSharp } from "react-icons/io5";
import { MdCircle, MdOpenInNew } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { AxiosAuthPatch, AxiosAuthPatchfile, AxiosAuthPost, AxiosGet, AxiosPost } from "@/app/axios/axios";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  status: Yup.string().required('Status is required'), // Expecting a single string
  comment: Yup.string().required('Comment is required'), // Expecting a single string
});

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
  const [loading, setloading] = useState(false);
  const {
    isOpen: isOpenConfirmTrx,
    onOpen: onOpenConfirmTrx,
    onClose: onCloseConfirmTrx,
  } = useDisclosure();
  const { isOpen:isOpenStatus, onOpen:onOpenStatus, onClose:onCloseStatus } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [Trnx_id, setTrnx_id] = useState("");
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
  let transactionId = Trnx_id;

  const url = "transactions/update-status";
  const handleConffirmation1 =async  ()=>{
    onClose();
    onOpenStatus()
  }
  const [selectedStatusValue, setSelectedStatusValue] = useState<string>('');
  const [selectedCommentValue, setSelectedCommentValue] = useState<string>('');
  const handleConffirmation = async (values:any) => {
    try {
      setloading(true);
      const res = await AxiosAuthPatch(url, values);
      console.log("response", res);
      if (res) {
        setloading(false);
        onOpenConfirmTrx();
        onCloseStatus();
      }
    } catch (err: any) {
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
      {/* <Box
  pb={"10px"}
  border="1px"
  borderColor="gray.200"
  borderRadius="md"
  borderTopRightRadius={"none"}
  borderTopLeftRadius={"none"}
  borderTop={"none"}
  w={"full"}  // Ensures the box takes full width
> */}
<TableContainer
 pb={"10px"}
 border="1px"
 borderColor="gray.200"
 borderRadius="md"
 borderTopRightRadius={"none"}
 borderTopLeftRadius={"none"}
 borderTop={"none"}
 w={"full"}  >
<Table w={"full"} size='lg'>
<Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th
                key={index}
                color={"#000000"}
                fontSize={"12px"}
                fontWeight={"700"}
                padding="10px" 
                // pb={'15px'}
                // Reduce padding to give more space
                // textAlign="left"
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
                  fontSize="12px"
                  fontWeight="600"
                  color={
                    key === "Transaction_type" && value === "sell"
                      ? "#D42620"
                      : key === "Transaction_type" && value === "buy"
                      ? "#0F973D"
                      : "#000000"
                  }
                  
                  padding="10px" // Adjust padding here too
                  maxWidth={key === "custo_name" ? "200px" : "auto"}
                  whiteSpace="nowrap" // Prevent text from overflowing
                  overflow="hidden"  // Prevent text from overflowing
                  textOverflow="ellipsis" // Add ellipsis if text overflow
                  >
                    {key === "Status" && value === "COMPLETED" ? (
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
                    ) : key === "Status" && value === "FAILED" ? (
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
                    ) 
                     : key === "Status" && value === "PENDING" ? (
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
                    ) :key === "Transaction_type" ? (
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
                     ): key === "Proof_of_payment" ? null : key ===
                      "timeInDays" ? null : key === "transaction_id" ? null : (
                      value
                    )}
                    {key === "custo_Name" && (
                      <Text
                      color={"#71717A"}
                      fontSize={["8px", "9px", "12px"]} // Adjusts for small, medium, and large screens
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
      {/* </Box> */}
      </TableContainer>

      {/* Modal for Transaction Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTransaction && selectedBank && (
              <Box>
                {Object.entries(selectedTransaction).map(([key, value]) => (
                  <HStack key={key} justifyContent="space-between" mb={2}>
                    <Text>{key}:</Text>
                    {key === "Proof_of_payment" ? (
                      <Link href={String(value)} color="blue.500" download>
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
                  <Text>Bank:</Text>
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
            {/* <Button
              colorScheme="red"
              mr={3}
              onClick={() => alert("Transaction Declined!")}
            >
              Decline Transaction
            </Button> */}
            <Button
              colorScheme="green"
              onClick={() => handleConffirmation1()}
              isLoading={loading}
            >
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
                <Fade triggerOnce direction="up">
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
      <Modal isOpen={isOpenStatus} onClose={onCloseStatus} isCentered>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>CONFIRM ORDER</ModalHeader> */}
          <ModalCloseButton />
          <Formik
      validationSchema={validationSchema}
      initialValues={{
        transactionId: String(transactionId),
        status: '',
        comment: '',
      }}
      onSubmit={(values) => {
        handleConffirmation(values);
        onClose(); // Close modal after submit
      }}
    >
      {({ setFieldValue, touched, errors, isValid, isSubmitting }) => (
        <Form>
          <ModalBody>
            {/* Status Checkboxes */}
            <GridItem>
              <VStack spacing={4} align="start">
                <ModalHeader>CHANGE ORDER STATUS</ModalHeader>
                <Checkbox 
                  colorScheme="green" 
                  isChecked={selectedStatusValue === "PENDING"}
                  onChange={() => {
                    const value = "PENDING";
                    setSelectedStatusValue(value);
                    setFieldValue('status', value);
                  }}
                >
                  PENDING
                </Checkbox>
                <Checkbox 
                  colorScheme="green" 
                  isChecked={selectedStatusValue === "COMPLETED"}
                  onChange={() => {
                    const value = "COMPLETED";
                    setSelectedStatusValue(value);
                    setFieldValue('status', value);
                  }}
                >
                  COMPLETED
                </Checkbox>
                <Checkbox 
                  colorScheme="green" 
                  isChecked={selectedStatusValue === "FAILED"}
                  onChange={() => {
                    const value = "FAILED";
                    setSelectedStatusValue(value);
                    setFieldValue('status', value);
                  }}
                >
                  FAILED
                </Checkbox>
              </VStack>
              {touched.status && errors.status && (
                <Text color="red.500" fontSize="sm">{errors.status}</Text>
              )}
            </GridItem>

            {/* Comment Checkboxes */}
            <GridItem mt={4}>
              <VStack spacing={4} align="start">
                <ModalHeader>REASON FOR ORDER STATUS</ModalHeader>
                <Checkbox 
                  colorScheme="red" 
                  isChecked={selectedCommentValue === "invalid details"}
                  onChange={() => {
                    const value = "invalid details";
                    setSelectedCommentValue(value);
                    setFieldValue('comment', value);
                  }}
                >
                  Invalid Details
                </Checkbox>
                <Checkbox 
                  colorScheme="red" 
                  isChecked={selectedCommentValue === "wrong wallet address"}
                  onChange={() => {
                    const value = "wrong wallet address";
                    setSelectedCommentValue(value);
                    setFieldValue('comment', value);
                  }}
                >
                  Wrong Wallet Address
                </Checkbox>
                <Checkbox 
                  colorScheme="red" 
                  isChecked={selectedCommentValue === "invalid Bank details"}
                  onChange={() => {
                    const value = "invalid Bank details";
                    setSelectedCommentValue(value);
                    setFieldValue('comment', value);
                  }}
                >
                  Invalid Bank Details
                </Checkbox>
                <Checkbox 
                  colorScheme="red" 
                  isChecked={selectedCommentValue === "transaction confirmed"}
                  onChange={() => {
                    const value = "transaction confirmed";
                    setSelectedCommentValue(value);
                    setFieldValue('comment', value);
                  }}
                >
                  Transaction Confirmed
                </Checkbox>
              </VStack>
              {touched.comment && errors.comment && (
                <Text color="red.500" fontSize="sm">{errors.comment}</Text>
              )}
            </GridItem>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} type="submit" isDisabled={!isValid || isSubmitting} isLoading={loading || isSubmitting}>
              Submit
            </Button>
            <Button onClick={onCloseStatus}>Cancel</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
