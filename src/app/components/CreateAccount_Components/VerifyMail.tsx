'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Box,
  Center,
  GridItem,
  HStack,
  PinInput,
  PinInputField,
  SimpleGrid,
  Text,
  Link,
  Button
} from "@chakra-ui/react";
import { Formik, useField, Form, useFormikContext,FieldArray } from "formik";
import * as Yup from "yup";

const VerifyMailSchema = Yup.object().shape({
  pin: Yup.array()
    .of(
      Yup.string()
        .matches(/^\d+$/, "Must be a number")
        .test("len", "Must be exactly 1 digit", (val) => val?.length === 1)
        .required("Required")
    )
    .length(6, "Must be exactly 6 digits"),
});

interface CustomPinInputFieldProps {
  name: string;
}

const CustomPinInputField: React.FC<CustomPinInputFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <PinInputField
      {...field}
      {...props}
      borderColor={meta.error && meta.touched ? "red.500" : "gray.200"}
      _focus={{
        borderColor: meta.error && meta.touched ? "red.500" : "blue.500",
      }}
    />
  );
};

const AutoSubmitToken = () => {
  const { values, isValid, dirty } = useFormikContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    if (isValid && dirty) {
      setShouldSubmit(true);
    } else {
      setShouldSubmit(false);
    }
  }, [isValid, dirty]);

  useEffect(() => {
    if (shouldSubmit===true) {
      const hiddenButton = document.getElementById('hiddenSubmitButton');
      if (hiddenButton) {
        hiddenButton.click();
      }
    }
  }, [shouldSubmit]);

  return null;
};

export default function VerifyMail() {
  const router = useRouter();

  return (
    <Box w={"full"}>
      <Center>
        <Formik
          initialValues={{ pin: ["", "", "", "", "", ""] }}
          validationSchema={VerifyMailSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
            console.log(values);
            // Handle form submission
            // Redirect to new page
            router.push("/createAccount/PersonalDetails"); // Replace "/new-page" with your desired URL
          }}
        >
          {({ errors, touched, setFieldValue, isValid, dirty }) => (
            <Form id="verifyMailForm">
              <SimpleGrid
                columns={6}
                w={["335px", "400px"]}
                columnGap={["8px", "8px"]}
                pb={["205px", "430px"]}
              >
                <GridItem colSpan={6}>
                  <Text fontSize={["32px", "40px"]} fontWeight={"600"} mb={"24px"}>
                    Verify your email
                  </Text>
                </GridItem>
                <GridItem colSpan={6}>
                  <Text fontSize={["12px", "14px"]} fontWeight={"600"}>
                    <span style={{ color: '#666666' }}>  Enter the verification code sent to</span> davidoshodi@gmail.com.
                  </Text>
                </GridItem>
                <GridItem colSpan={6} mb={"40px"}>
                  <Link
                    _hover={{
                      outline: "none",
                    }}
                  >
                    <Text
                      fontSize={["13px", "14px"]}
                      fontWeight={"600"}
                      color={"#0CBF94"}
                    >
                      Not my email
                    </Text>
                  </Link>
                </GridItem>

                <GridItem colSpan={6} mb={"40px"}>
                <FieldArray name="pin">
                    {({ form }) => (
                      <HStack gap={['8px', '22px']}>
                        <PinInput
                          size="lg"
                          value={form.values.pin.join('')}
                          onChange={(value) => {
                            const pins = value.split('');
                            pins.forEach((pin, index) => setFieldValue(`pin[${index}]`, pin));
                          }}
                        >
                          {form.values.pin.map((_: any, index: React.Key | null | undefined) => (
                            <CustomPinInputField key={index} name={`pin[${index}]`} />
                          ))}
                        </PinInput>
                      </HStack>
                    )}
                  </FieldArray>
                </GridItem>
                <GridItem colSpan={6} mb={"40px"}>
                  <Link
                    _hover={{
                      outline: "none",
                    }}
                  >
                    <Text fontSize={["13px", "14px"]} fontWeight={"600"} mt={"16px"}>
                      Didn’t get code ?{" "}
                      <span style={{ color: "#0CBF94" }}>Resend</span>
                    </Text>
                  </Link>
                  <Button

                    id="hiddenSubmitButton"
                    type="submit"
                   display={'none'}
                 
                    colorScheme="teal"

                    size="lg"
                    mt={4}
                    isDisabled={!isValid || !dirty}
                  >
                    Submit
                  </Button>

                </GridItem>
              </SimpleGrid>
              <AutoSubmitToken />
            </Form>
          )}
        </Formik>
      </Center>
    </Box>
  );
}
