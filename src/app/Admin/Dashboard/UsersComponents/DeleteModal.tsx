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
} from "@chakra-ui/react";
// import Reject from "../Kycadminmodal/rejection";
// import Reject from "./rejection";
export default function DeleteUser({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {

  const [selectedValues, setSelectedValues] = useState([]);
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Selected values: " + selectedValues.join(", "));
    setSelectedValues([]);
    
    
  };
//   const handleSecondaryAction = () => {
//     // Handle form submission or other actions here
//     onClose() // Close the current modal
//     onSecondModalOpen(); // Open the new modal
//   };
  // const {onOpen} = useDisclosure()
  //   const [close, setclose] = useState(false);
  return (
    <SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <HStack>
            <Box pt={"14px"} pb={"16px"} pl={"24px"}>
              <Text fontSize={"16px"} fontWeight={"700"}>
              Reason for Delete
              </Text>
            </Box>
            <Box>
              <ModalCloseButton />
            </Box>
          </HStack>
          <ModalBody>
            <SimpleGrid w={"full"} gap={"16px"} px={"24px"} pb={"24px"}>
            <form onSubmit={handleSubmit}>
              <GridItem>
               
                  <CheckboxGroup
                    onChange={(values: any) => setSelectedValues(values)}
                    defaultValue={[
                      ''
                    ]}
                  >
                    <VStack spacing={4} align="start">
                      <Checkbox  colorScheme='green' value="Illegal transaction suspect">Illegal transaction suspect</Checkbox>
                      <Checkbox colorScheme='green' value="Reason for Suspension">Reason for Suspension</Checkbox>
                      <Checkbox  colorScheme='green'value="Incomplete KYC">Incomplete KYC</Checkbox>
                      <Checkbox  colorScheme='green' value="KYC update required">KYC update required</Checkbox>
                      <Checkbox  colorScheme='green' value="Security breach">Security breach</Checkbox>
                    </VStack>
                  </CheckboxGroup>
              </GridItem>

              <GridItem w={"full"} mt={'16px'}>
                <Button
                  w={"full"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  bg={"#023436"}
                  type="submit"
                  color={'white'}
                //   onClick={ handleSecondaryAction
                //   }
                >
                Suspend user
                </Button>
              </GridItem>
              </form>
              <GridItem w={"full"}>
                <Button
                bg={'transparent'}
                color={'#FF4834'}
                border={'1px'}
                borderColor={'#FF4834'}
                  w={"full"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </GridItem>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Reject isOpen={isSecondModalOpen} onClose={onSecondModalClose}/> */}
    </SimpleGrid>
  );
}
