'use client';

import React from 'react';
import { Box, Button, Center, GridItem, HStack, PinInput, PinInputField, SimpleGrid, Text } from '@chakra-ui/react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const CreatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
    .min(6, 'Password must be exactly 6 characters')
    .max(6, 'Password must be exactly 6 characters')
    .required('Required'),
});

export default function CreatePin({ setStep, setPassword }:{ setStep:any, setPassword:any }) {
  return (
    <Box w={'full'}>
      <Center>
        <Formik
          initialValues={{ password: '' }}
          validationSchema={CreatePasswordSchema}
          onSubmit={(values) => {
            setPassword(values.password);
            setStep(2);
          }}
        >
          {({ errors, touched, setFieldValue, isValid, dirty, values }) => (
            <Form>
              <SimpleGrid
                columns={6}
                w={['335px', '400px']}
                columnGap={['8px', '8px']}
                pb={['192px', '440px']}
                px={['10px', '0px']}
              >
                <GridItem colSpan={6}>
                <Text fontSize={['32px', '40px']} fontWeight={'600'} mb={'24px'}>
                    Create  Pin
                  </Text>
                </GridItem>
                <GridItem colSpan={6}>
                  <Text
                    fontSize={['13px', '14px']}
                    fontWeight={'600'}
                    mb={'40px'}
                    color={'#666666'}
                  >
                    Set a 6-character alphanumeric password
                  </Text>
                </GridItem>
                <GridItem colSpan={6} width={'full'}>
                <HStack gap={['8px', '22px']}>
                  <PinInput
                  placeholder=''
                    size="lg"
                    value={values.password}
                    onChange={(value) => setFieldValue('password', value)}
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PinInputField key={index} name={`password.${index}`} />
                    ))}
                  </PinInput>
                  </HStack>
                </GridItem>
                <GridItem colSpan={6} mb={'40px'}>
                  <Button
                    type="submit"
                    w={'full'}
                    bg={isValid ? '#0CBF94' : 'gray.400'}
                    fontSize={'16px'}
                    fontWeight={'600'}
                    mt={'28px'}
                    color={isValid ? '#021D17' : 'gray.600'}
                    isDisabled={!isValid || !dirty}
                    _hover={{
                      bg: isValid ? '#0CBF94' : 'gray.400',
                    }}
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
