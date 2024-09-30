'use client'

import React from "react";
import { Formik, Form, Field } from "formik";
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
} from "@chakra-ui/react";

interface SusPendProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SusPend({ isOpen, onClose }: SusPendProps) {
  const initialValues = {
    reasons: [],
  };

  const handleSubmit = (values: { reasons: string[] }, { resetForm }: { resetForm: () => void }) => {
    alert("Selected values: " + values.reasons.join(", "));
    resetForm();
    onClose();
  };

  return (
    <SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <HStack>
            <Box pt="14px" pb="16px" pl="24px">
              <Text fontSize="16px" fontWeight="700">
                Reason for Suspension
              </Text>
            </Box>
            <Box>
              <ModalCloseButton />
            </Box>
          </HStack>
          <ModalBody>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form>
                  <SimpleGrid w="full" gap="16px" px="24px" pb="24px">
                    <GridItem>
                      <VStack spacing={4} align="start">
                        <Field
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
                        </Field>
                      </VStack>
                    </GridItem>

                    <GridItem w="full" mt="16px">
                      <Button
                        w="full"
                        fontSize="16px"
                        fontWeight="600"
                        bg="#023436"
                        type="submit"
                        color="white"
                        isDisabled={values.reasons.length === 0}
                      >
                        Suspend user
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