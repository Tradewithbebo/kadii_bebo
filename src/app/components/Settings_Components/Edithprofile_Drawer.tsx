import {
  Text,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  VStack,
  SimpleGrid,
  GridItem,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";


interface Edith_profile {
  isOpen: any;
  onOpen: any;
  onClose: any;
}

export default function Edithprofile_Drawer({
  isOpen,
  onOpen,
  onClose,
}: Edith_profile) {
  // const {  onClose } = useDisclosure()
  // const btnRef = React.useRef()

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={["xs", "xs", "sm"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <VStack w={"full"}>
              <Box w={"full"}>
                <Text>Update profile</Text>
              </Box>
              <Box w={"full"}>
                <Text fontSize={"16px"} fontWeight={"600"} color={"#666666"}>
                  Update your profile with the correct information
                </Text>
              </Box>
            </VStack>
          </DrawerHeader>

          <DrawerBody>
            <SimpleGrid columns={1} gap={'28px'}>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" 
                  placeholder="Username"/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input type="text"
                  placeholder="Enter phone number" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Date of birth</FormLabel>
                  <Input type="date" 
                      _placeholder={{ opacity: 1, color: 'gray.500' }}
/>
                </FormControl>
              </GridItem>
              <GridItem w={'full'}>
                <Button bg={'#0CBF94'} w={'full'}>
                Update profile
                </Button>
              </GridItem>
            </SimpleGrid>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
