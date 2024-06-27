'use client';
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
  InputGroup,
  InputRightElement,
  Text,
  Hide,
} from '@chakra-ui/react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Resetaccount() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  return (
    <Box w={'full'}>
      <Center pb={['254px', '385px']}>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => {
            console.log(values);
            router.push('/createAccount/EnterVerification');
          }}
        >
          {({ errors, touched, isValid,dirty }) => (
            <Form>
              <SimpleGrid columns={2} rowGap={'24px'} w={['335px', '400px']}>
                <GridItem colSpan={2} mb={'16px'}>
                  <Box>
                    <Text fontSize={['32px', '40px']} fontWeight={'600'} color={''}>
                      Reset password
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={'14px'} fontWeight={'600'} color={'#666666'}>
                      Reset your password below
                    </Text>
                  </Box>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      New password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={show ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="Enter your password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                          bg={'transparent'}
                          _hover={{ background: 'transparent' }}
                        >
                          {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                    <FormLabel fontSize={'16px'} fontWeight={'600'}>
                      Confirm password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={show ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                          bg={'transparent'}
                          _hover={{ background: 'transparent' }}
                        >
                          {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
