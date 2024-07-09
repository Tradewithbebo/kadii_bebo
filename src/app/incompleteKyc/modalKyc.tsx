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
  Center
} from '@chakra-ui/react';
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import Kyc from './drawer/Kyc';

export default function ModalKyc({ isOpentwo, onClosetwo }:{ isOpentwo:any, onClosetwo:any }) {
  const { isOpen: isOpenone, onOpen: onOpenone, onClose: onCloseone } = useDisclosure();

  const handleopen = () => {
    onClosetwo(); // Call the function to close Modal Two
    onOpenone();  // Call the function to open Modal One
  };

  return (
    <SimpleGrid>
      <Modal isOpen={isOpentwo} onClose={onClosetwo} isCentered size={['xs', 'sm']}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid w={'full'} column={1} py={'48px'}>
              <GridItem display={'flex'} colSpan={1} justifyContent={'center'}>
                <Box width={"50px"} height={"50px"} bg={"#FBE2B7"} p={"4px"} rounded={"50%"}>
                  <Box width={"42px"} height={"42px"} bg={"#FEF6E7"} p={"4px"} rounded={"50%"}>
                    <Center>
                      <BsExclamationCircle size={"30px"} />
                    </Center>
                  </Box>
                </Box>
              </GridItem>
              <GridItem mt={'20px'} display={'flex'} colSpan={1} justifyContent={'center'}>
                <Text fontWeight={'600'} fontSize={'25px'}>Incomplete KYC</Text>
              </GridItem>
              <GridItem mt={'18px'} display={'flex'} colSpan={1} justifyContent={'center'} color={'#666666'}>
                <Text fontWeight={'600'} fontSize={'15px'}>Complete your KYC to start transacting</Text>
              </GridItem>
              <GridItem w={'full'} colSpan={1} mt={'40px'}>
                <Button w={'100%'} bg={'#0CBF94'} onClick={handleopen}>Complete KYC</Button>
              </GridItem>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Kyc isOpenone={isOpenone} onCloseone={onCloseone} />
    </SimpleGrid>
  );
}
