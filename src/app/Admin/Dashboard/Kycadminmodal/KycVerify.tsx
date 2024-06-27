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
} from "@chakra-ui/react";
import Verify from "./Verify";
export default function KycVerify({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure();

  const handleSecondaryAction = () => {
    // Handle form submission or other actions here
    onClose() // Close the current modal
    onSecondModalOpen(); // Open the new modal
  };
  // const {onOpen} = useDisclosure()
//   const [close, setclose] = useState(false);
  return (
    <SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
         <HStack><Box pt={'14px'} pb={'16px'}  pl={'24px'}>
         <Text fontSize={'16px'} fontWeight={'700'}>Verify KYC</Text>
         </Box>
         <Box>
         <ModalCloseButton />
         </Box>
         </HStack>
          <ModalBody>
            <SimpleGrid w={"full"} gap={'16px'} px={'24px'} pb={'24px'}>
          <GridItem>
          <Box pt={'14px'} pb={'16px'}  pl={'24px'}>
         <Text fontSize={'14px'} fontWeight={'500'}> Are you sure you have confirmed the document and images submitted?</Text>
         </Box>
          </GridItem>

                <GridItem w={'full'}>
                    <Button w={'full'} fontSize={'16px'} fontWeight={'600'} bg={'#0CBF94'}
                    onClick={handleSecondaryAction}>
                    Continue to verify
                    </Button>
                    
                </GridItem>
                <GridItem w={'full'} >
                    <Button w={'full'} fontSize={'16px'} fontWeight={'600'}  onClick={onClose}>
                    Cancel
                    </Button>
                    
                </GridItem>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Verify isOpen={isSecondModalOpen} onClose={onSecondModalClose}/>
    </SimpleGrid>
  );
}
