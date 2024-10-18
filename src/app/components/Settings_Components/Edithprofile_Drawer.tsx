"use client";

import { AxiosGet, AxiosAuthPostfile, AxiosAuthPatchfile } from "@/app/axios/axios";
import {
  Text,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  VStack,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import Router from "next/router"; // Ensure this is imported correctly

interface FormValues {
  avatar: File | null;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string;
}

// Updated validation schema for partial updates
const PersonalDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),

  dateOfBirth: Yup.date().required("Date of birth is required"),

  avatar: Yup.mixed()
    .nullable()
    // .required('Avatar is required')
    .test("fileType", "Unsupported File Format", (value) => {
      // Check if the file type exists and matches allowed types
      return value && value instanceof File
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        : true;
    }),
});

interface Edith_profile {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function Edithprofile_Drawer({
  isOpen,
  onOpen,
  onClose,
}: Edith_profile) {
  const url = "auth/me";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toast = useToast();

  const fetchUserDetails = async () => {
    try {
      const res = await AxiosGet(url);
      if (res) {
        setUserDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const initialValues: FormValues = {
    username:  "",
    lastName:  "",
    firstName: "",
    phoneNumber: "",
    dateOfBirth:  "",
    avatar: null,
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue("avatar", file);
      setSelectedFile(file);

      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
    }
  };

  const handleProceed = async (values: FormValues) => {
    if (values) {
      setLoading(true);
      try {
        const formData = new FormData();
        
        if (values.username) formData.append("username", values.username);
        if (values.phoneNumber) formData.append("phoneNumber", values.phoneNumber);
        
        // Convert date to ISO 8601 format
        if (values.dateOfBirth) {
          const isoDate = new Date(values.dateOfBirth).toISOString().split('T')[0]; // Extract YYYY-MM-DD
          formData.append("dateOfBirth", isoDate);
        }
        
        if (values.avatar) formData.append("photo", values.avatar);
        if (values.firstName) formData.append("firstName", values.firstName);
        if (values.lastName) formData.append("lastName", values.lastName);
  
        const res = await AxiosAuthPatchfile(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setLoading(false);
        if (res && res.data) {
          toast({
            title: "Success",
            description: "Profile successfully updated",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          });
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
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={["xs", "xs", "sm"]}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <VStack w={"full"}>
            <Box w={"full"}>
              <Text>Update profile</Text>
            </Box>
            <Box w={"full"}>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#666666"}>
                Update your profile with the correct information
              </Text>
            </Box>
          </VStack>
        </DrawerHeader>

        <DrawerBody>
          <Formik
            initialValues={initialValues}
            // validationSchema={PersonalDetailsSchema}
            onSubmit={handleProceed}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                <SimpleGrid columns={1} gap={"28px"}>
                  <GridItem colSpan={1} pt={"28px"}>
                    <FormControl>
                      <FormLabel fontSize={"16px"} fontWeight={"600"}>
                        Upload Profile Photo
                      </FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleFileChange(event, setFieldValue)
                        }
                        style={{ display: "none" }}
                        id="file-upload"
                      />
                      <FormLabel
                        htmlFor="file-upload"
                        w={"120px"}
                        h={"120px"}
                        fontSize={"16px"}
                        fontWeight={"600"}
                        border={"2px dashed #CCCCCC"}
                        rounded={"full"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        cursor={"pointer"}
                        overflow={"hidden"}
                        textAlign={"center"}
                        position={"relative"}
                      >
                        {imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageUrl}
                            alt="Selected"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <VStack spacing={1}>
                            <AiOutlineCamera size={"32px"} color={"#0CBF94"} />
                            <Text
                              color={"#0CBF94"}
                              fontSize={"12px"}
                              fontWeight={"600"}
                              textAlign={"center"}
                            >
                              {selectedFile
                                ? selectedFile.name
                                : "Add Profile Photo"}
                            </Text>
                          </VStack>
                        )}
                      </FormLabel>
                      <ErrorMessage name="avatar" component="div" />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Field name="username">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="Username"
                            h={["50px", "50px", "44px"]}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="username" component="div" />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Field name="firstName">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="First Name"
                            h={["50px", "50px", "44px"]}
                          />
                        )}
                      </Field>
                      {errors.firstName && touched.firstName && (
                        <Text color="red.500">{errors.firstName}</Text>
                      )}
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Field name="lastName">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="Last Name"
                            h={["50px", "50px", "44px"]}
                          />
                        )}
                      </Field>
                      {errors.lastName && touched.lastName && (
                        <Text color="red.500">{errors.lastName}</Text>
                      )}
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Phone Number</FormLabel>
                      <Field name="phoneNumber">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="Phone Number"
                            h={["50px", "50px", "44px"]}
                          />
                        )}
                      </Field>
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text color="red.500">{errors.phoneNumber}</Text>
                      )}
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Date of Birth</FormLabel>
                      <Field name="dateOfBirth">
                        {({ field }: { field: any }) => (
                          <Input
                            {...field}
                            type="date"
                            h={["50px", "50px", "44px"]}
                          />
                        )}
                      </Field>
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <Text color="red.500">{errors.dateOfBirth}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <Button
                    w={"full"}
                    bg={"#0CBF94"}
                    color={"white"}
                    _hover={{ bg: "#0CBF94" }}
                    type="submit"
                    isLoading={loading}
                    h={["50px", "50px", "44px"]}
                  >
                    Save Changes
                  </Button>
                </SimpleGrid>

                <DrawerFooter></DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
