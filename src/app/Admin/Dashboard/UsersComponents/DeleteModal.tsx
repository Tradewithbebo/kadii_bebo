"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import {
  Button,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  Box,
  SimpleGrid,
  GridItem,
  HStack,
  VStack,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useAdminContext } from "../../Admincontext";
import { AxiosDelete } from "@/app/axios/axios";
import { useRouter } from 'next/navigation';
import SusPend from '../AdminUsersComponents/Suspenmodal';

interface DeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUser({ isOpen, onClose }: DeleteUserProps) {
  const { adminId, setAdminId } = useAdminContext();
  const toast = useToast();
  const router = useRouter();
  const {  usersId, setUsersId } = useAdminContext();
  const id = usersId;
  const url = `users/suspend/${id}`;


  const initialValues = {
    reasons: [],
  };

  const handleSubmit = async (
    values: { reasons: string[] },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await AxiosDelete(url);
      if (response) {
        toast({
          title: "User suspended.",
          description: "The user has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push('/Admin/Dashboard/users');
        // resetForm();
        onClose();
      }
    } catch (err: any) {
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }

      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <HStack>
            <Box pt="14px" pb="16px" pl="24px">
              <Text fontSize="16px" fontWeight="700">
                Reason for suspension
              </Text>
            </Box>
            <Box>
              <ModalCloseButton />
            </Box>
          </HStack>
          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, isSubmitting }) => (
                <Form>
                  <SimpleGrid w="full" gap="16px" px="24px" pb="24px">
                  <GridItem display={'flex'} justifyContent={'center'} width={'full'}>
                    <Text textAlign={'center'} w={'70%'}>
                        Are you sure you want to SusPend this User
                        
                      </Text>
                      {/* <VStack spacing={4} align="start"> */}
                        {/* <Field
                          as={Checkbox}
                          name="reasons"
                          value="Illegal transaction suspect"
                          colorScheme="green"
                        >
                          Illegal transaction suspect
                        </Field>
                        <Field
                          as={Checkbox}
                          name="reasons"
                          value="Reason for Suspension"
                          colorScheme="green"
                        >
                          Reason for Suspension
                        </Field>
                        <Field
                          as={Checkbox}
                          name="reasons"
                          value="Incomplete KYC"
                          colorScheme="green"
                        >
                          Incomplete KYC
                        </Field>
                        <Field
                          as={Checkbox}
                          name="reasons"
                          value="KYC update required"
                          colorScheme="green"
                        >
                          KYC update required
                        </Field>
                        <Field
                          as={Checkbox}
                          name="reasons"
                          value="Security breach"
                          colorScheme="green"
                        >
                          Security breach
                        </Field>*/}
                      {/* </VStack> */}
                    </GridItem> 

                    <GridItem w="full" mt="16px">
                      <Button
                        w="full"
                        fontSize="16px"
                        fontWeight="600"
                        bg="#FF4834"
                        type="submit"
                        color="white"
                        // isDisabled={values.reasons.length === 0 || isSubmitting}
                        isLoading={isSubmitting}
                      >
                        SusPend user
                      </Button>
                    </GridItem>
                    <GridItem w="full">
                      <Button
                        bg="transparent"
                        color="#FF4834"
                        border="1px"
                        borderColor="#FF4834"
                        w="full"
                        fontSize="16px"
                        fontWeight="600"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </GridItem>
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}
