"use client";
import {
  Box,
  Button,
  Divider,
  GridItem,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { AxiosDelete, AxiosGet } from "@/app/axios/axios";
import { useCryptoContext } from "../Buy/usecontextbuy";

interface Bank {
  accountName: string;
  accountNumber: string;
  bankName: string;
  _id: string;
}

export default function SellAddBank({ Setstep }: { Setstep: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state
  const {
    userId,
    setaccountName,
    setbankName,
    setaccountNumber,
    setaccountid,
    accountid
  } = useCryptoContext();

  const [loading3, setLoading3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [existingBank, setExistingBank] = useState<Bank[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage2, setErrorMessage2] = useState<string | null>(null);
  const toast = useToast();
  const {
    isOpen: isOpendelete,
    onOpen: onOpendelete,
    onClose: onClosedelete,
  } = useDisclosure();
  const url = `banks/accounts/${userId}`;
  const handleDeleteClick = () => {
    onOpendelete();
    onClose();
  };
  let bankId=accountid
  const url2 =`banks/accounts/${bankId}`
  
  const handleConfirmDelete =async () => {
    
        setLoading(true);
        try {
         
    
          const res = await AxiosDelete(url2);
    
          setLoading(false);
          if (res) {
            toast({
              title: "Success",
              description: "Bank has been deleted",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "bottom-left",
            })}
          
        } catch (err: any) {
          setLoading(false);
          let message = "Check your Network and try again.";
          if (err.response && err.response.data && err.response.data.message) {
            message = err.response.data.message;
          }
          setErrorMessage2(message);
          toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      
    
    
    onClose(); // Close the main modal
  };

  const getDetails = async () => {
    setLoading3(true);
    try {
      const res = await AxiosGet(url);
      if (res) {
        setExistingBank(res.data);
      }
    } catch (err: any) {
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []); // Ensure useEffect runs only once on mount

  const banksToDisplay = showAll ? existingBank : existingBank.slice(0, 2);

  if (loading3) {
    return (
      <Box
        width="full"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <HStack>
          <Spinner size="lg" />
          <Text fontSize="16px" fontWeight="600" ml={3}>
            Getting your banks
          </Text>
        </HStack>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={1} w="full">
        <GridItem colSpan={1}>
          <Text fontWeight="600" fontSize="25px">
            Select bank account
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt="10px">
          <Text fontWeight="600" fontSize={["11px", "15px"]} color="#666666">
            Add your preferred bank for instant payout
          </Text>
        </GridItem>
        <GridItem colSpan={1} mt="18px">
          {banksToDisplay.map((bank) => (
            <SimpleGrid
              key={bank._id}
              onClick={() => {
                setaccountName(bank.accountName);
                setbankName(bank.bankName);
                setaccountNumber(bank.accountNumber);
                setaccountid(bank._id);
                onOpen(); // Open modal when a bank is clicked
              }}
              mb="8px"
              columns={6}
              w="full"
              gap="40px"
              p="16px"
              border="1px"
              bgColor="#f3f4f6"
              borderColor="#e5e7eb"
              borderRadius="10px"
              cursor="pointer"
              _hover={{
                bg: "#E7F6EC",
                borderColor: "#0CBF94",
              }}
            >
              <GridItem colSpan={6} display="flex" justifyContent="start">
                <Text fontWeight="600" fontSize="16px" isTruncated>
                  {bank.accountName}
                </Text>
              </GridItem>
              <GridItem
                colSpan={4}
                display="flex"
                alignItems="center"
                w={"full"}
              >
                <Box flexGrow={0} flexShrink={0} overflow="hidden">
                  <Text fontWeight="400" fontSize="14px" isTruncated>
                    {bank.accountNumber}
                  </Text>
                </Box>
                <Box px={"4px"}>
                  <Divider
                    orientation="vertical"
                    height="20px"
                    borderColor="#d4d4d8"
                    borderWidth="1px"
                  />
                </Box>
                <Box
                  flexGrow={0}
                  minWidth="100px"
                  flexShrink={0}
                  overflow="hidden"
                >
                  <Text fontWeight="400" fontSize="14px" isTruncated>
                    {bank.bankName.length > 15
                      ? `${bank.bankName.slice(0, 15)}...`
                      : bank.bankName}
                  </Text>
                </Box>
              </GridItem>
            </SimpleGrid>
          ))}

          {existingBank.length > 2 && (
            <Button
              onClick={() => setShowAll(!showAll)}
              mt={4}
              bg="#0CBF94"
              w="full"
            >
              {showAll ? "Show Less" : "Show all my banks"}
            </Button>
          )}
        </GridItem>
        <GridItem colSpan={1} mt="30px">
          <Button
            width="full"
            color="#0CBF94"
            fontSize="16px"
            fontWeight="600"
            onClick={() => Setstep(10)}
            h={["50px", "50px", "44px"]}
          >
            <FaPlus /> &nbsp; &nbsp;Add bank
          </Button>
        </GridItem>
        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={["xs", "md", "lg"]}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Selection</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Are you sure you want to continue with this bank account for
                payout?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
                Delete
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  // Perform your continue action here
                  Setstep(2); // Example action
                  onClose();
                }}
              >
                Continue
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SimpleGrid>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isOpendelete}
        onClose={onClosedelete}
        isCentered
        size={["xs", "md", "lg"]}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this Bank? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete} isLoading={loading}>
              Yes, Delete
            </Button>
            <Button bg="gray.200"  onClick={() => onClosedelete()}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
