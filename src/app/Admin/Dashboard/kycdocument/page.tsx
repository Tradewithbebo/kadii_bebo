"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { MdCircle, MdGppGood } from "react-icons/md";
// import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import KycVerify from "../Kycadminmodal/KycVerify";
import Kycreject from "../Kycadminmodal/Kycreject";
// import { useHistory } from 'react-router-dom';
const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <HStack onClick={handleGoBack} cursor="pointer">
      <Box>
        <FaArrowLeftLong />
      </Box>
      <Box>
        <Text fontWeight={"700"} fontSize={"16px"} color={"#18181B"}>
          Back
        </Text>
      </Box>
    </HStack>
  );
};

 function ButtonsVerify() {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  return (
    <div>
      <KycVerify isOpen={isModalOpen} onClose={onModalOpen} />
      <Button
        rounded={"20px"}
        color="#000000E5"
        fontSize={"13px"}
        bg={"#C7EED5"}
        onClick={onModalClose}
      >
        Verify
      </Button>
    </div>
  );
}
function ButtonsReject() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isFirstModalOpen, onOpen: onFirstModalOpen, onClose: onFirstModalClose } = useDisclosure();
  return (
    <div>
      <Kycreject isOpen={isFirstModalOpen} onClose={onFirstModalClose} />
      <Button
        onClick={onFirstModalOpen}
        rounded={"20px"}
        color="#DD524D"
        fontSize={"13px"}
        bg={"transparent"}
        border={"1px"}
        borderColor={"#DD524D"}
      >
        Decline
      </Button>
    </div>
  );
}

export default function page() {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box w={"100%"} height={"100%"}>
      <Box w={"100%"} pb={"24px"}>
        <GoBackButton />
      </Box>
      <Card
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        // cursor="pointer"
        transition="transform 0.5s ease-in-out, background-color 0.7s ease"
        w={"100%"}
        height={"full"}
      >
        <CardBody>
          <HStack w={"full"} display={"flex"} justifyContent={"space-between"}>
            <HStack>
              <Box>
                <Text fontWeight={"500"} fontSize={"20px"} color={"#8B8B8B"}>
                  KYC Status:
                </Text>
              </Box>
              <Box rounded={"10px"} px={"5px"} bg={"#C7EED5"}>
                <HStack gap={"3px"}>
                  <MdCircle size={"10px"} color="#2F7F37" />
                  <Text color="#2F7F37" fontSize={"12px"}>
                    Completed
                  </Text>
                </HStack>
              </Box>
            </HStack>
            <Box>
              <Text fontWeight={"500"} fontSize={"12px"} color={"#8B8B8B"}>
                Last update on:22/06/23
              </Text>
            </Box>
          </HStack>
          <SimpleGrid w={"70%"} columns={2}>
            <GridItem colSpan={1}>
              <Text fontWeight={"500"} fontSize={"20px"} color={"#8B8B8B"}>
                Name
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"500"} fontSize={"20px"} color={"#8B8B8B"}>
                Email
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"500"} fontSize={"20px"} color={"#18181B"}>
                Matthew Olaoluwa Olukoju
              </Text>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontWeight={"500"} fontSize={"20px"} color={"#18181B"}>
                mymail@mail.com
              </Text>
            </GridItem>
            <GridItem colSpan={1} w={"full"} pr={"40px"}>
              <HStack display={"Flex"} justifyContent={"space-between"}>
                <Box>
                  <Text fontWeight={"500"} fontSize={"20px"} color={"#8B8B8B"}>
                    BVN
                  </Text>
                </Box>
                <HStack gap={"none"}>
                  <Box>
                    <Text color="#2F7F37" fontSize={"12px"}>
                      Verified
                    </Text>
                  </Box>
                  <Box>
                    <MdGppGood
                      style={{
                        display: "inline",
                        marginLeft: "8px",
                        color: "green",
                      }}
                    />
                  </Box>
                </HStack>
              </HStack>
            </GridItem>
            <GridItem colSpan={1}>
              <HStack>
                <Box>
                  <Text fontWeight={"500"} fontSize={"20px"} color={"#8B8B8B"}>
                    NIN
                  </Text>
                </Box>
                <Box>
                  <HStack>
                    <ButtonsVerify />
                    <ButtonsReject />
                  </HStack>
                </Box>
              </HStack>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontWeight={"500"} fontSize={"20px"} color={"#18181B"}>
                232173871983
              </Text>
            </GridItem>

            <GridItem
              colSpan={1}
              w={"full"}
              display={"flex"}
              justifyContent={"start"}
            >
              <VStack w={"full"} display={"flex"} justifyContent={"start"}>
                <Box display={"flex"} justifyContent={"start"} w={"full"}>
                  <Text fontWeight={"500"} fontSize={"20px"} color={"#18181B"}>
                    232173871983
                  </Text>
                </Box>
                <Box display={"flex"} justifyContent={"start"} w={"full"}>
                  <Link color={"#4F46E5"} fontWeight={"500"} fontSize={"12px"}>
                    View documents
                  </Link>
                </Box>
              </VStack>
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
}
