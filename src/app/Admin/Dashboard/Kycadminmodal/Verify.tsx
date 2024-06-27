import React, { useState } from "react";
import {
  Button,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
  Box,
  SimpleGrid,
  GridItem,
  Center,
  HStack,
  CheckboxGroup,
  VStack,
  Checkbox,
  extendTheme,
  Image,
} from "@chakra-ui/react";
export default function Verify({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Selected values: " + selectedValues.join(", "));
    setSelectedValues([]);
  };
  // const {onOpen} = useDisclosure()
  //   const [close, setclose] = useState(false);
  return (
    <SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <SimpleGrid w={"full"} gap={"16px"} px={"24px"} pb={"24px"} pt={'28px'}>
              <GridItem w={"full"} justifyContent={'center'} display={'flex'}>
                <Image
                  borderRadius="full"
                  height="49px"
                  width="52px"
                  objectFit="cover"
                      src="/image/Good.png"
                  alt="Dan Abramov"
                />
              </GridItem>
              <GridItem w={"full"}>
                <Text fontSize={'12px'} fontWeight={'500'}>
                You have successfully accepted <span style={{fontSize:'14px', fontWeight:'700'}}>“Matthew Ola” </span> verification <Box justifyContent='center' display='flex' width="full">application</Box>
                </Text>
              </GridItem>
              <GridItem w={"full"}>
                <Button
                  w={"full"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  onClick={onClose}
                  bg={'#0AA07C'}
                >
                  Done
                </Button>
              </GridItem>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}
