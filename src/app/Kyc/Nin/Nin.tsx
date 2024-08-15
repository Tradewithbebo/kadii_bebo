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
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AxiosPost } from '@/app/axios/axios';
import { useRouter } from 'next/navigation';

// Yup validation schema
const NinSchema = Yup.object().shape({
  bvn: Yup.string()
    .matches(/^\d+$/, 'Must be a number')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits')
    .required('BVN is required'),
});


export default function Nin() {
  const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const toast = useToast();
const url = "kyc";
const Router = useRouter();

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

      const res = await AxiosPost(url, values);
        setLoading(false);
      setLoading(false);
      if (res && res.data) {
      //  console.log( res.data);/
        
        Router.push("/createAccount/Login");
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
          }}
          validationSchema={NinSchema}
          onSubmit={handleProceed}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={1} rowGap={'24px'} w={['335px', '400px']}>
              <Box display={'none'}> 
                  <Field
                    as={Input}
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
                      type="text"
                      name="bvn"
                      placeholder="Enter your national ID number"
                    />
                    <FormErrorMessage>{errors.bvn}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1} mt={'4px'}>
                  <Button
                    type="submit"
                    bg="#0CBF94"
                    fontSize={'16px'}
                    fontWeight={'600'}
                    w={'100%'}
                    color={'#021D17'}
                    isDisabled={!isValid || !dirty}
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
