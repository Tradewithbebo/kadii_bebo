'use client'
import React from 'react';
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
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const NinSchema = Yup.object().shape({
  verificationType: Yup.string().required('Verification type is required'),
  bvn: Yup.string()
    .matches(/^\d+$/, 'Must be a number')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits')
    .required('BVN is required'),
});

export default function Nin() {
  return (
    <Box w={'full'}>
      <Center  
      pb={['272px', '370px']}
      >
        <Formik
          initialValues={{
            verificationType: '',
            bvn: '',
          }}
          validationSchema={NinSchema}
          onSubmit={(values) => {
            console.log(values);
            alert('Form submitted successfully!');
            // Handle form submission
          }}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <SimpleGrid columns={1} rowGap={'24px'} w={['335px', '400px']}>
               
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
