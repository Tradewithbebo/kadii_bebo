import { AxiosAuthPatch } from "@/app/axios/axios";
import {
  Box,
  Text,
  Checkbox,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Button,
  ModalFooter,
  useToast,
  useDisclosure,
  Image,
  Textarea
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import * as Yup from "yup";

const validationSchema = Yup.object({
  status: Yup.string().required("Status is required"),
  comment: Yup.string().required("Comment is required"),
});

export default function Decline({
  transactionId,
  declineOpen,
  declineClose,
}: {
  transactionId: any;
  declineOpen: any;
  declineClose: any;
}) {
  const [selectedStatusValue, setSelectedStatusValue] = useState<string>("");
  const [selectedCommentValue, setSelectedCommentValue] = useState<string>("");
  const [customComment, setCustomComment] = useState<string>("");
  const url = "transactions/update-status";
  const [loading, setLoading] = useState(false);
  const { isOpen: isOpenDecline, onOpen: onOpenDecline, onClose: onCloseDecline } = useDisclosure();
  const toast = useToast();

  const resetSelections = () => {
    setSelectedStatusValue("");
    setSelectedCommentValue("");
    setCustomComment("");
  };

  const handleConfirmation = async (values: any, resetForm: any) => {
    try {
      setLoading(true);
      const res = await AxiosAuthPatch(url, values);
      if (res) {
        setLoading(false);
        onOpenDecline();
        declineClose();
        resetForm(); // Reset Formik form on successful submission
      }
    } catch (err: any) {
      setLoading(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box>
      <Modal size={'sm'} isOpen={declineOpen}  onClose={() => {
          declineClose();
          resetSelections(); // Reset selections on modal close
        }} isCentered  >
        <ModalOverlay />
        <ModalContent h={'90%'} overflowY={'scroll'}>
          <ModalCloseButton />
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              transactionId: String(transactionId),
              status: "",
              comment: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleConfirmation(values, resetForm); // Pass resetForm to handleConfirmation
              onCloseDecline();
            }}
          >
            {({ setFieldValue, touched, errors, isValid, isSubmitting, resetForm }) => (
              <Form>
                <ModalBody>
                  <GridItem>
                    <VStack spacing={4} align="start">
                      <ModalHeader>CHANGE ORDER STATUS</ModalHeader>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedStatusValue === "PENDING"}
                        onChange={() => {
                          const value = "PENDING";
                          setSelectedStatusValue(value);
                          setFieldValue("status", value);
                        }}
                      >
                        PENDING
                      </Checkbox>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedStatusValue === "COMPLETED"}
                        onChange={() => {
                          const value = "COMPLETED";
                          setSelectedStatusValue(value);
                          setFieldValue("status", value);
                        }}
                      >
                        COMPLETED
                      </Checkbox>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedStatusValue === "FAILED"}
                        onChange={() => {
                          const value = "FAILED";
                          setSelectedStatusValue(value);
                          setFieldValue("status", value);
                        }}
                      >
                        FAILED
                      </Checkbox>
                    </VStack>
                    {touched.status && errors.status && (
                      <Text color="red.500" fontSize="sm">
                        {errors.status}
                      </Text>
                    )}
                  </GridItem>

                  <GridItem mt={4}>
                    <VStack spacing={4} align="start">
                      <ModalHeader>REASON FOR ORDER STATUS</ModalHeader>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedCommentValue === "invalid details"}
                        onChange={() => {
                          const value = "invalid details";
                          setSelectedCommentValue(value);
                          setFieldValue("comment", value);
                          setCustomComment("");
                        }}
                      >
                        Invalid Details
                      </Checkbox>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedCommentValue === "wrong wallet address"}
                        onChange={() => {
                          const value = "wrong wallet address";
                          setSelectedCommentValue(value);
                          setFieldValue("comment", value);
                          setCustomComment("");
                        }}
                      >
                        Wrong Wallet Address
                      </Checkbox>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedCommentValue === "invalid Bank details"}
                        onChange={() => {
                          const value = "invalid Bank details";
                          setSelectedCommentValue(value);
                          setFieldValue("comment", value);
                          setCustomComment("");
                        }}
                      >
                        Invalid Bank Details
                      </Checkbox>
                      <Checkbox
                        colorScheme="red"
                        isChecked={selectedCommentValue === "transaction confirmed"}
                        onChange={() => {
                          const value = "transaction confirmed";
                          setSelectedCommentValue(value);
                          setFieldValue("comment", value);
                          setCustomComment("");
                        }}
                      >
                        Transaction Confirmed
                      </Checkbox>

                      <Textarea
                        placeholder="type your reason"
                        value={customComment}
                        onChange={(e) => {
                          setCustomComment(e.target.value);
                          setSelectedCommentValue("");
                          setFieldValue("comment", e.target.value);
                        }}
                      />
                    </VStack>
                    {touched.comment && errors.comment && (
                      <Text color="red.500" fontSize="sm">
                        {errors.comment}
                      </Text>
                    )}
                  </GridItem>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    type="submit"
                    isDisabled={!isValid || isSubmitting}
                    isLoading={loading || isSubmitting}
                  >
                    Submit
                  </Button>
                  <Button onClick={() => {
                    declineClose();
                    resetSelections(); // Reset selections on cancel
                  }}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDecline} onClose={onCloseDecline} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack width={"full"} justifyContent={"center"} display={"flex"}>
              <Box
                width={"full"}
                justifyContent={"center"}
                display={"flex"}
                textAlign={"center"}
              >
                <Fade triggerOnce direction="up">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src="/image/Good.png"
                    alt="Confirmation"
                  />
                </Fade>
              </Box>
              <Box
                width={"60%"}
                justifyContent={"center"}
                display={"flex"}
                textAlign={"center"}
              >
                You have successfully Declined this transaction
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseDecline} w={"full"} bg={"#0CBF94"}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
