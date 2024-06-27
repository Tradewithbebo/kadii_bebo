'use client';
import React from 'react';
import {
  Box,
  Button,
  Center,
  GridItem,
  HStack,
  PinInput,
  PinInputField,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Formik, FieldArray, Form, useField } from 'formik';
import * as Yup from 'yup';

const CreatePinSchema = Yup.object().shape({
  pin: Yup.array()
    .of(
      Yup.string()
        .matches(/^\d+$/, 'Must be a number')
        .test('len', 'Must be exactly 1 digit', (val) => val?.length === 1)
        .required('Required')
    )
    .length(6, 'Must be exactly 6 digits'),
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
      borderColor={meta.error && meta.touched ? 'red.500' : 'gray.200'}
      _focus={{ borderColor: meta.error && meta.touched ? 'red.500' : 'blue.500' }}
    />
  );
};

export default function CreatePin() {
  const router = useRouter();

  return (
    <Box w={'full'}>
      <Center>
        <Formik
          initialValues={{ pin: ['', '', '', '', '', ''] }}
          validationSchema={CreatePinSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            router.push('/createAccount/confirmPin');
          }}
        >
          {({ errors, touched, setFieldValue, isValid, dirty }) => (
            <Form>
              <SimpleGrid
                columns={6}
                w={['335px', '400px']}
                columnGap={['8px', '8px']}
                pb={['192px', '474px']}
                px={['10px', '0px']}
              >
                <GridItem colSpan={6}>
                  <Text fontSize={['32px', '40px']} fontWeight={'600'} mb={'24px'}>
                    Create your PIN
                  </Text>
                </GridItem>
                <GridItem colSpan={6}>
                  <Text
                    fontSize={['13px', '14px']}
                    fontWeight={'600'}
                    mb={'40px'}
                    color={'#666666'}
                  >
                    Set 6-digit transaction PIN
                  </Text>
                </GridItem>

                <GridItem colSpan={6} width={'full'}>
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
