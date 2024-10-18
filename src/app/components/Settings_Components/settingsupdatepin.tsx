import { AxiosAuthPost } from "@/app/axios/axios";
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
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
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
    oldPin: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Pin must be alphanumeric")
      .min(4, "Pin must be exactly 4 characters")
      .max(4, "Pin must be exactly 4 characters")
      .required("Old pin is required"),
      newPin: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Pin must be alphanumeric")
      .min(4, "Pin must be exactly 4 characters")
      .max(4, "Pin must be exactly 4 characters")
      .required("New pin is required"),
    confirmPin: Yup.string()
      .oneOf([Yup.ref('newPin')], 'Pins must match')
      .required('Confirm pin is required'),
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toast = useToast();
  const url='auth/change-pin'
  const handleProceed = async (values: any) => {
    if (values) {
      setLoading(true);
      try {
       
  
        const res = await AxiosAuthPost(url, values);
  
        setLoading(false);
        if (res && res.data) {
          toast({
            title: "Success",
            description: "pin successfully updated",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      } catch (err: any) {
        setLoading(false);
        let message = "Check your Network and try again.";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        setErrorMessage(message);
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };
  
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
              initialValues={{ oldPin: "", newPin: "", confirmPin: "" }}
              validationSchema={CreatePasswordSchema}
              onSubmit={handleProceed}
            >
              {({ errors, touched, setFieldValue, isValid, dirty, values }) => (
                <Form>
                  <SimpleGrid columns={1} gap={"28px"}>
                    <GridItem colSpan={1}>
                      <FormControl
                        isInvalid={!!errors.oldPin && touched.oldPin}
                      >
                        <FormLabel>Old pin</FormLabel>
                        <HStack gap={["8px", "22px"]}>
                          <PinInput
                            placeholder=""
                            size="lg"
                            value={values.oldPin}
                            onChange={(value) => setFieldValue("oldPin", value)}
                          >
                            {Array.from({ length: 4 }).map((_, index) => (
                              <PinInputField
                                key={index}
                                name={`oldPin.${index}`}
                              />
                            ))}
                          </PinInput>
                        </HStack>
                        <FormErrorMessage>{errors.oldPin}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.newPin && touched.newPin}>
                        <FormLabel>New Pin</FormLabel>
                        <HStack gap={["8px", "22px"]}>
                          <PinInput
                            placeholder=""
                            size="lg"
                            value={values.newPin}
                            onChange={(value) => setFieldValue("newPin", value)}
                          >
                            {Array.from({ length: 4 }).map((_, index) => (
                              <PinInputField
                                key={index}
                                name={`newPin.${index}`}
                              />
                            ))}
                          </PinInput>
                        </HStack>
                        <FormErrorMessage>{errors.newPin}</FormErrorMessage>
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                      <FormControl
                        isInvalid={!!errors.confirmPin && touched.confirmPin}
                      >
                        <FormLabel>Confirm Pin</FormLabel>
                        <HStack gap={["8px", "22px"]}>
                          <PinInput
                            placeholder=""
                            size="lg"
                            value={values.confirmPin}
                            onChange={(value) =>
                              setFieldValue("confirmPin", value)
                            }
                          >
                            {Array.from({ length: 4 }).map((_, index) => (
                              <PinInputField
                                key={index}
                                name={`confirmPin.${index}`}
                              />
                            ))}
                          </PinInput>
                        </HStack>
                        <Text
                          color="red.500"
                          // ml={2}
                          //   cursor={'pointer'}
                          fontSize="sm"
                          fontWeight="400"
                        >
                          {!isValid
                            ? "pin must match,old pin must not be empty"
                            : ""}
                        </Text>
                      </FormControl>
                    </GridItem>
                    <GridItem w={"full"}>
                      <Button
                        bg={"#0CBF94"}
                        w={"full"}
                        type="submit"
                        isLoading={loading}
                      >
                        Update Pin
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
