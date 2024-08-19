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
  PinInputField,
  HStack,
  PinInput,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface Edith_Pin {
  isOpen: any;
  onOpen: any;
  onClose: any;
}

export default function Settingsupdatepin({
  isOpen,
  onOpen,
  onClose,
}: Edith_Pin) {
  // const {  onClose } = useDisclosure()
  // const btnRef = React.useRef()
  const CreatePasswordSchema = Yup.object().shape({
    oldpin: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric")
      .min(6, "Password must be exactly 6 characters")
      .max(6, "Password must be exactly 6 characters")
      .required("Required"),
      pin: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric")
      .min(6, "Password must be exactly 6 characters")
      .max(6, "Password must be exactly 6 characters")
      .required("Required"),
      confirmPin: Yup.string()
      .oneOf([Yup.ref('pin')], 'pin must match')
      .required('Required'),
  });
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
                <Text>Update PIN</Text>
              </Box>
              <Box w={"full"}>
                <Text fontSize={"16px"} fontWeight={"600"} color={"#666666"}>
                Update your six(6) digit transaction PIN
                </Text>
              </Box>
            </VStack>
          </DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={{ oldpin: "",pin:"",confirmPin:"" }}
              validationSchema={CreatePasswordSchema}
              onSubmit={(values) => {}}
            >
              {({ errors, touched, setFieldValue, isValid, dirty, values }) => (
                <Form>
                  <SimpleGrid columns={1} gap={"28px"}>
                    <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.oldpin && touched.oldpin}>
                    <FormLabel>Old pin</FormLabel>
                      <HStack gap={["8px", "22px"]}>
                    
                     
                        <PinInput
                          placeholder=""
                          size="lg"
                          value={values.oldpin}
                          onChange={(value) => setFieldValue("oldpin", value)}
                        >
                          {Array.from({ length: 6 }).map((_, index) => (
                            <PinInputField
                              key={index}
                              name={`oldpin.${index}`}
                            />
                          ))}
                        </PinInput>
                        
                      </HStack>
                      <FormErrorMessage>{errors.oldpin}</FormErrorMessage>
                      </FormControl>
                    </GridItem>


                    <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.pin && touched.pin}>
                    <FormLabel>New Pin</FormLabel>
                      <HStack gap={["8px", "22px"]}>
                    
                     
                        <PinInput
                          placeholder=""
                          size="lg"
                          value={values.pin}
                          onChange={(value) => setFieldValue("pin", value)}
                        >
                          {Array.from({ length: 6 }).map((_, index) => (
                            <PinInputField
                              key={index}
                              name={`pin.${index}`}
                            />
                          ))}
                        </PinInput>
                        
                      </HStack>
                      <FormErrorMessage>{errors.pin}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                   
                    <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.confirmPin && touched.confirmPin}>
                    <FormLabel>Confirm Pin</FormLabel>
                      <HStack gap={["8px", "22px"]}>
                    
                     
                        <PinInput
                          placeholder=""
                          size="lg"
                          value={values.confirmPin}
                          onChange={(value) => setFieldValue("confirmPin", value)}
                        >
                          {Array.from({ length: 6 }).map((_, index) => (
                            <PinInputField
                              key={index}
                              name={`confirmPin.${index}`}
                            />
                          ))}
                        </PinInput>
                        
                      </HStack>
                      <Text color="red.500"
                      // ml={2}
                    //   cursor={'pointer'}
                      fontSize="sm"
                      fontWeight="400">{!isValid ?"pin must match,old pin must not be empty":""}</Text>
                      </FormControl>
                    </GridItem>
                    <GridItem w={"full"}>
                      <Button bg={"#0CBF94"} w={"full"}>
                        Update profile
                      </Button>
                    </GridItem>
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
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
