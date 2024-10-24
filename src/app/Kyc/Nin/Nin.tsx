'use client'
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  SimpleGrid,
  GridItem,
  Input,
  Button,
  Text,
  Center,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AxiosAuthPost, AxiosAuthPostfile, AxiosPost } from '@/app/axios/axios';
import { useRouter } from 'next/navigation';
import { IoDocumentOutline } from 'react-icons/io5';

// Yup validation schema
const NinSchema = Yup.object().shape({
  bvn: Yup.string()
    .matches(/^\d+$/, 'Must be a number')
    .required('BVN is required'),
});


export default function Nin() {
  const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const toast = useToast();
const url = "kyc";
const Router = useRouter();
const [selectedFile, setSelectedFile] = useState<File | null>(null);

const handleProceed = async (values: any) => {
  if (values) {
    setLoading(true);
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("documentType", values.documentType);
      formData.append("documentNumber", values.documentNumber);
      if (values.document) {
        formData.append("document", values.document);
      }

      const res = await AxiosAuthPostfile(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      if (res && res.data) {
      //  console.log( res.data);
        
        Router.push("/");
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
    <Box w={'full'}>
      <Center  
      pb={['272px', '370px']}
      >
        <Formik
          initialValues={{
            documentType: "BVN",
            bvn: '',
            document: '',
          }}
          validationSchema={NinSchema}
          onSubmit={handleProceed}
          enableReinitialize
        >
          {({ setFieldValue,errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={1} rowGap={'24px'} w={['335px', '400px']}>
              <GridItem colSpan={2} pt={"28px" } display={'none'}>
                  <FormControl
                    isInvalid={!!errors.document && touched.document}
                  >
                    <FormLabel fontSize={"16px"} fontWeight={"600"}>
                      Upload picture of National ID number
                    </FormLabel>
                    <Input
                      type="file"
                      accept=".pdf, .docx"
                       name='document'
                      id="document"
                      isDisabled
                    />

                    <FormLabel
                      htmlFor="file-upload"
                      w={"full"}
                      fontSize={"16px"}
                      fontWeight={"600"}
                      border={"2px dashed #CCCCCC"}
                      rounded={"8px"}
                      py={"8px"}
                      textAlign={"center"}
                      cursor={"pointer"}
                    >
                      <HStack justifyContent={"center"}>
                        <IoDocumentOutline color={"#0CBF94"} />
                        <Text
                          color={"#0CBF94"}
                          fontSize={"16px"}
                          fontWeight={"600"}
                        >
                          {selectedFile ? selectedFile.name : "my nin . jpeg"}
                        </Text>
                      </HStack>
                    </FormLabel>
                    {selectedFile ? (
                      <Text mt={2}>File selected: {selectedFile.name}</Text>
                    ) : (
                      <FormErrorMessage>{errors.document}</FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
              <Box display={'none'}> 
                  <Field
                    as={Input}
                    h={['50px','50px','44px']}
                    type="text"
                    name="documentType"
                    placeholder="1245678904"
                  />
                </Box>
                <GridItem colSpan={1}>
                  <FormControl isInvalid={!!errors.bvn && touched.bvn}>
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      Enter BVN
                    </FormLabel>
                    <Field
                      as={Input}
                      h={['50px','50px','44px']}
                      type="text"
                      name="bvn"
                      placeholder="Enter your national ID number"
                    />
                    <FormErrorMessage>{errors.bvn}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1} mt={'4px'}>
                  <Button
                   h={['50px','50px','44px']}
                    type="submit"
                    bg="#0CBF94"
                    fontSize={'16px'}
                    fontWeight={'600'}
                    w={'100%'}
                    color={'#021D17'}
                    isDisabled={!isValid || !dirty}
                    isLoading={loading}
                  >
                    Continue
                  </Button>
                </GridItem>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Center>
    </Box>
  );
}
