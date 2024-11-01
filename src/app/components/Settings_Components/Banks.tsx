'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Text,
  useDisclosure,
  useToast,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react'
import { useCryptoContext } from '../drawer/Buy/usecontextbuy'
import { AxiosDelete, AxiosGet } from '@/app/axios/axios'

interface Bank {
  accountName: string
  accountNumber: string
  bankName: string
  _id: string
}

interface BanksProps {
  isOpen: boolean
  onClose: () => void
}

export default function Banks({ isOpen, onClose }: BanksProps) {
  const {
    userId,
    setaccountName,
    setbankName,
    setaccountNumber,
    setaccountid,
    accountid
  } = useCryptoContext()

  const [loading3, setLoading3] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [existingBank, setExistingBank] = useState<Bank[]>([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage2, setErrorMessage2] = useState<string | null>(null)
  const toast = useToast()
  const {
    isOpen: isOpendelete,
    onOpen: onOpendelete,
    onClose: onClosedelete,
  } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  const url = `banks/accounts/${userId}`
  const url2 = `banks/accounts/${accountid}`

  const handleDeleteClick = () => {
    onOpendelete()
    onClose()
  }

  const handleConfirmDelete = async () => {
    setLoading(true)
    try {
      const res = await AxiosDelete(url2)
      setLoading(false)
      if (res) {
        toast({
          title: "Success",
          description: "Bank has been deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        })
        onClosedelete()
        getDetails() // Refresh the list after deletion
       
      }
    } catch (err: any) {
      setLoading(false)
      let message = "Check your Network and try again."
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      setErrorMessage2(message)
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })
    }
    onClosedelete()
  }

  const getDetails = async () => {
    setLoading3(true)
    try {
      const res = await AxiosGet(url)
      if (res) {
        setExistingBank(res.data)
      }
    } catch (err: any) {
      let message = "Check your Network and try again."
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      setErrorMessage(message)
    } finally {
      setLoading3(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      getDetails()
    }
  }, [isOpen, userId])

  const banksToDisplay = showAll ? existingBank : existingBank.slice(0, 2)

  return (
    <>
     <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={["xs", "xs", "sm"]}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Your Banks</DrawerHeader>
    <DrawerBody>
      {loading3 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Spinner size="xl" />
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {banksToDisplay.length > 0 ? (
            banksToDisplay.map((bank) => (
              <SimpleGrid
                key={bank._id}
                onClick={() => {
                  setaccountid(bank._id);
                  onOpendelete();
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
                <GridItem colSpan={4} display="flex" alignItems="center" w={"full"}>
                  <Box flexGrow={0} flexShrink={0} overflow="hidden">
                    <Text fontWeight="400" fontSize="14px" isTruncated>
                      {bank.accountNumber}
                    </Text>
                  </Box>
                  <Box px={"4px"}>
                    <Divider orientation="vertical" height="20px" borderColor="#d4d4d8" borderWidth="1px" />
                  </Box>
                  <Box flexGrow={0} minWidth="100px" flexShrink={0} overflow="hidden">
                    <Text fontWeight="400" fontSize="14px" isTruncated>
                      {bank.bankName.length > 15 ? `${bank.bankName.slice(0, 15)}...` : bank.bankName}
                    </Text>
                  </Box>
                </GridItem>
              </SimpleGrid>
            ))
          ) : (
            <Text textAlign="center" color="gray.500">You are yet to add any Bank</Text>
          )}
          {existingBank.length > 2 && banksToDisplay.length > 0 && (
            <Button onClick={() => setShowAll(!showAll)} bg={"#0CBF94"} width="full">
              {showAll ? 'Show Less' : 'Show All My Banks'}
            </Button>
          )}
        </VStack>
      )}
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline" mr={3} onClick={onClose}>
        Close
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>


      <AlertDialog
        isOpen={isOpendelete}
        leastDestructiveRef={cancelRef}
        onClose={onClosedelete}
        size={["xs", "xs", "sm"]}
      >
        <AlertDialogOverlay >
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Bank Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone. This will permanently delete your bank account from our records.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClosedelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3} isLoading={loading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}