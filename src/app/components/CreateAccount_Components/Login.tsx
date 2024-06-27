'use client';

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Center,
  Input,
  SimpleGrid,
  GridItem,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginComponent() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  return (
    <Box w={'full'}>
      <Center pb={['80px', '206px']}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
            router.push('/');
          }}
        >
          {({ errors, touched, isValid,dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={'24px'} w={['335px', '400px']}>
                <GridItem colSpan={2} mb={'16px'}>
                  <Box>
                    <Text fontSize={['32px', '40px']} fontWeight={'600'} color={''}>
                      Login
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={'14px'} fontWeight={'600'} color={'#666666'}>
                      Login to continue transacting
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button w={'full'} fontSize={['16px', '16px']} fontWeight={'600'}>
                    <FcGoogle size={'22px'} /> &nbsp;&nbsp;Continue with google
                  </Button>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text textAlign={'center'} fontSize={'14px'} fontWeight={'500'} color={'#B3B3B3'} my={'4px'}>
                    OR
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      Email
                    </FormLabel>
                    <Field as={Input} type="email" name="email" placeholder="Email address" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                    <FormHelperText textAlign={'right'} color={'#0CBF94'} fontSize={'14px'} fontWeight={'600'} cursor={'pointer'}>
                      Forgot password
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Field as={Input} type={show ? 'text' : 'password'} name="password" placeholder="Enter your password" />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick} bg={'transparent'} _hover={{ background: 'transparent' }}>
                          {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
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
                  <Text textAlign={'left'} fontSize={'14px'} mt={'16px'} fontWeight={'600'} cursor={'pointer'}>
                    Don’t have an account? <span style={{ color: '#0CBF94' }}>Create account</span>
                  </Text>
                </GridItem>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Center>
    </Box>
  );
}
