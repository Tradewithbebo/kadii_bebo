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
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AxiosPost } from '@/app/axios/axios';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string() .min(8, "Password must be at least 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  )
  .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});
export default function Resetaccount({Pin}:{Pin:any}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "auth/reset-password";

  const handleSubmit = async (values: any) => {
    if (values) {
      // console.log(values)
      setLoading(true);
      try {
        const res = await AxiosPost(url, values);
        setLoading(false);
        if (res) {
          toast({
            title: "success",
            description: 'pin successfully created',
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-left",
          });
          router.push("/createAccount/Login");
        }
      } catch (err: any) {
        setLoading(false);
        let message = "Check your Network and try again.";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        setErrorMessage(message = err.response.data.message ? 'Invalid verification code' : message);
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <Box w={'full'}>
      <Center pb={['254px', '385px']}>
        <Formik
          initialValues={{token:Pin, newPassword:'',confirmPassword:'' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => {
            handleSubmit(values)
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
                  isLoading={loading}
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
