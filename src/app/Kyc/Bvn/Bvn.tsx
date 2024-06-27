'use client'
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Center,
  Input,
  SimpleGrid,
  GridItem,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react';
import { IoDocumentOutline } from 'react-icons/io5';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

// Yup validation schema
const BvnSchema = Yup.object().shape({
  nationalIdNumber: Yup.string()
    .matches(/^\d+$/, 'Must be a number')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('National ID number is required'),
  nationalIdFile: Yup.mixed()
    .required('A file is required')
    .test(
      'fileSize',
      'File size is too large',
      value => !value || (value && (value as File).size <= 5242880) // 5MB
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      value => !value || (value && ['application/pdf', 'application/msword'].includes((value as File).type))
    ),
});

export default function Bvn() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const Router=useRouter()
  return (
    <Box w={'full'}>
      <Center  pb={['127px', '235px']}
      >
        <Formik
          initialValues={{
            nationalIdNumber: '',
            nationalIdFile: null,
          }}
          validationSchema={BvnSchema}
          onSubmit={(values) => {
            console.log(values);
            alert('Form submitted successfully!');
            Router.push('/createAccount/Login')
            // Handle form submission
          }}
        >
          {({ setFieldValue, errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={'24px'} w={['335px', '400px']}>
                <GridItem colSpan={2}>
                  <FormControl
                    isInvalid={!!errors.nationalIdNumber && touched.nationalIdNumber}
                  >
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      Enter national ID number
                    </FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="nationalIdNumber"
                      placeholder="1245678904"
                    />
                    <FormErrorMessage>{errors.nationalIdNumber}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} pt={'28px'}>
                  <FormControl
                    isInvalid={!!errors.nationalIdFile && touched.nationalIdFile}
                  >
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      Upload picture of National ID number
                    </FormLabel>
                    <Input
                      type="file"
                      accept=".pdf, .docx"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        setFieldValue('nationalIdFile', file);
                        setSelectedFile(file || null);
                      }}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <FormLabel
                      htmlFor="file-upload"
                      w={'full'}
                      fontSize={'16px'}
                      fontWeight={'600'}
                      border={'2px dashed #CCCCCC'}
                      rounded={'8px'}
                      py={'8px'}
                      textAlign={'center'}
                      cursor={'pointer'}
                    >
                      <HStack justifyContent={'center'}>
                        <IoDocumentOutline color={'#0CBF94'} />
                        <Text color={'#0CBF94'} fontSize={'16px'} fontWeight={'600'}>
                          {selectedFile ? selectedFile.name : 'my nin . jpeg'}
                        </Text>
                      </HStack>
                    </FormLabel>
                    {selectedFile ? (
                      <Text mt={2}>File selected: {selectedFile.name}</Text>
                    ) : (
                      <FormErrorMessage>{errors.nationalIdFile}</FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} mt={'4px'}>
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
