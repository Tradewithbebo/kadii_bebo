'use client';

import React, { useState } from 'react';
import {
  Text,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  ChakraProvider,
  extendTheme,
  Center,
  IconButton,
  InputRightElement,
  InputGroup,
  SimpleGrid,
  GridItem,
  Link,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { color } from 'framer-motion';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#186B53',
        color: 'white',
      },
    },
  },
});

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required('New Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const initialValues = { newPassword: '', confirmPassword: '' };

  const handleSubmit = (values:any, actions:any) => {
    alert(JSON.stringify(values));
    actions.setSubmitting(false);
  };

  return (
    
      <Box bg={'#186B53'}>
        <Center h="100vh">
          <VStack>
            <Box pb={'56px'}>
              <Text fontSize={'36px'} fontWeight={'800'} color={'#FFFFFF'}>
                Reset Password
              </Text>
            </Box>
            <Box
              w="md"
              p={8}
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              border="1px"
              borderColor="gray.200"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, dirty, isValid }) => (
                  <Form>
                    <SimpleGrid w={'full'} gap={'16px'} p={'40px'}>
                      <GridItem>
                        <FormControl
                          isInvalid={
                            !!errors.newPassword && touched.newPassword
                          }
                        >
                          <FormLabel fontSize={'16px'} fontWeight={'600'}>
                            New Password
                          </FormLabel>
                          <InputGroup>
                            <Field
                              as={Input}
                              type={showPassword ? 'text' : 'password'}
                              name="newPassword"
                              placeholder="Enter new password"
                            //   color='black'
                            />
                            <InputRightElement>
                              <IconButton
                                aria-label={
                                  showPassword
                                    ? 'Hide password'
                                    : 'Show password'
                                }
                                icon={
                                  showPassword ? <ViewOffIcon /> : <ViewIcon />
                                }
                                onClick={togglePasswordVisibility}
                                variant="ghost"
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.newPassword}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl
                          isInvalid={
                            !!errors.confirmPassword && touched.confirmPassword
                          }
                        >
                          <FormLabel fontSize={'16px'} fontWeight={'600'}>
                            Confirm Password
                          </FormLabel>
                          <InputGroup>
                          <Field
                        //   color='black'
                            as={Input}
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Re-enter new password"
                          />
                          <InputRightElement>
                              <IconButton
                                aria-label={
                                  showPassword
                                    ? 'Hide password'
                                    : 'Show password'
                                }
                                icon={
                                  showPassword ? <ViewOffIcon /> : <ViewIcon />
                                }
                                onClick={togglePasswordVisibility}
                                variant="ghost"
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.confirmPassword}
                          </FormErrorMessage>
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <Button
                          fontWeight={'600'}
                          fontSize={'16px'}
                          w={'full'}
                          bg="#0CBF94"
                          isLoading={isSubmitting}
                          type="submit"
                          isDisabled={!isValid || !dirty}
                        >
                          Reset Password
                        </Button>
                      </GridItem>
                    </SimpleGrid>
                  </Form>
                )}
              </Formik>
            </Box>
          </VStack>
        </Center>
      </Box>
   
  );
}
