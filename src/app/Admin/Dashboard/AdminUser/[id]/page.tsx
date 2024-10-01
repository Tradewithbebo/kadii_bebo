'use client'
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Image,
  CardBody,
  Card,
  SimpleGrid,
  Link,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdGppGood } from "react-icons/md";
import SusPend from "../../UsersComponents/Suspenmodal";
// import DeleteUser from "../../UsersComponents/DeleteModal";
import { AxiosGet } from "@/app/axios/axios";
import { useParams } from "next/navigation";
import DeleteUser from "../../AdminUsersComponents/DeleteModal";
import { useAdminContext } from "@/app/Admin/Admincontext";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams()
  const userId = params.id as string
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen: Deleteisopen, onOpen: DeleteonopenModalOpen, onClose: DeleteoncloseModalclose } = useDisclosure();
  const data = [
    {
      title: "total number payout",
      number: "10.928",
    },
    {
      title: "total sign ups",
      number: "3,493",
    },
  ];
  interface AdminUser {
    // Define user properties here
    _id: string
    name: string
    email:string
    // Add other properties as needed
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [AdminUser, setAdminUser] = useState<AdminUser | null>(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loadingUser, setLoadingUser] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMessage, setErrorMessage] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { adminId, setAdminId } = useAdminContext();
const Url ="admin"

  const getAdminUserById = async (): Promise<boolean> => {
    setLoadingUser(true)
    try {
      const response = await AxiosGet(Url)
      if (response.data) {
        console.log('data', response.data)
        
        const foundUser = response.data.find((user: AdminUser) => user._id === userId)
        
        if (foundUser) {
          setAdminId(foundUser._id)
          setAdminUser(foundUser)
          setErrorMessage('')
          return true
        } else {
          setErrorMessage('Admin user not found')
          return false
        }
      } else {
        setErrorMessage('Invalid response data')
        return false
      }
    } catch (err: any) {
      setLoadingUser(false)
      let message = "Check your Network and try again."
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      setErrorMessage(message)
      return false
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAdminUserById()
  }, [])
  return (
    <Box w={"full"}>
      <Box pb={"24px"} w={"full"}>
        <Text fontSize={"16px"} fontWeight={"700"}>
          Admin Users
        </Text>
      </Box>
      {/* <VStack w={"full"}> */}
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        display={"flex"}
        pb={"36px"}
      >
        <HStack w={"full"} gap={"8px"}>
          <Image
            boxSize="56px"
            rounded="100%"
            src="https://bit.ly/dan-abramov"
            alt="Simon the pensive"
            mr="12px"
          />
          <VStack w={"full"} gap={"1px"}>
            <Box w={"full"}>
              <Text fontWeight={"800"} fontSize={"18px"}>
                {AdminUser?.name}
              </Text>
            </Box>
            <Box w={"full"}>
              <Text fontWeight={"400"} fontSize={"12px"}>
              {AdminUser?.email}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <HStack>
          <Box>
            <Button
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#FFFFFF"}
              bg={"#023436"}
              onClick={onSecondModalOpen}
            >
              Suspend user
            </Button>
          </Box>
          <Box>
            <Button
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#FF4834"}
              bg={"transparent"}
              border={"1px"}
              borderColor={"#FF4834"}
              onClick={DeleteonopenModalOpen}
            >
              Delete account
            </Button>
          </Box>
        </HStack>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        width="100%"
        pb={"24px"}
      >
        {data.map((item, index) => (
          <Card
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            key={index}
            cursor="pointer"
            bg={"white"}
            _hover={{
              bg: "#ECECEC",
              transform: "scale(1.1)",
            }}
            transition="transform 0.5s ease-in-out, background-color 0.7s ease"
          >
            <CardBody>
              <Box>
                <Text fontSize="11px" fontWeight="500" color={"#71717A"}>
                  {item.title}
                </Text>
                <Text fontSize="18px" fontWeight="700">
                  {item.number}
                </Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
     
      <SimpleGrid w={"40%"}>
        <GridItem w={"full"} pb={"16px"}>
          <Text fontWeight={"500"} fontSize={"11px"} color={"#A1A1AA"}>
            ADMIN DETAILS
          </Text>
        </GridItem>
        <GridItem w={"full"} pb={"24px"}>
            <VStack w={"full"}>
              <Box w={"full"}>
                <Text fontWeight={"500"} fontSize={"12px"}>
                {AdminUser?.name}

                </Text>
              </Box>
              <HStack w={"full"}>
                <Text fontWeight={"500"} fontSize={"12px"} color={"#A1A1AA"}>
                {AdminUser?.email}

                </Text>
                <Button
            // w={'full'}
            size='xs'
            rounded={'10px'}
              bg={"transparent"}
              border={"1px"}
              borderColor={"#A1A1AA"}
              fontWeight={"400"}
              fontSize={"10px"}
            >
              Admin
            </Button>
              </HStack>
              
            </VStack>
        </GridItem>

      
<SusPend isOpen={isSecondModalOpen} onClose={onSecondModalClose}/>
<DeleteUser isOpen={Deleteisopen} onClose={DeleteoncloseModalclose}/>
      </SimpleGrid>
    </Box>
  );
}
