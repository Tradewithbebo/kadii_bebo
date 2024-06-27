'use client'

import { Box,Text, Tbody, Td, Thead, Tr, Table, Th, HStack, useToast } from "@chakra-ui/react";
import React from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoFilterSharp } from "react-icons/io5";
import { MdCoPresent, MdCopyAll, MdCopyright, MdGppGood } from "react-icons/md";
// import { GrStatusGood } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function TAbleuser({
  headers,
  data,
  bank
}: {
  headers: any;
  data: any;
  bank: any;
}) {
  const toast = useToast()
  const Router=useRouter()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard.",
          description: `Copied: ${text}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <>
      <Box
        pb={"10px"}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        borderTopRightRadius={"none"}
        borderTopLeftRadius={"none"}
        borderTop={"none"}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              {headers.map((header: any, index: any) => (
                <Th
                  key={index}
                  color={"#000000"}
                  fontSize={"10px"}
                  fontWeight={"700"}
                >
                  {header}{" "}
                  {header === "KYC Level" && (
                    <IoFilterSharp
                      style={{ display: "inline", marginLeft: "8px" }}
                    />
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {data.map((row: any, rowIndex: any) => (
              <Tr key={rowIndex}>
                {Object.values(row).map((value: any, cellIndex) => (
                  <Td
                    key={cellIndex}
                    color={cellIndex === 2 ? "#2F7F37" : "#000000"} // Conditional color
                    fontSize={"12px"}
                   
                    fontWeight={"600"}
                    //   bg={cellIndex === 2 ? 'yellow.200' : 'transparent'}  // Conditional background color
                  >
                    {cellIndex === 0 ? ( <Box  cursor={'pointer'} onClick={ ()=>{
                          Router.push('/Admin/Dashboard/User/1')
                        }}>{value } </Box>):value }
                    
                 
                   
                    {cellIndex === 2 && (
                      <MdGppGood
                        style={{
                          display: "inline",
                          marginLeft: "8px",
                          color: "green",
                        }}
                        
                      />
                    )}
                      {cellIndex === 0  && (
        
                    <HStack><Text color={'#71717A'} fontSize={'9px'} fontWeight={'500'}>
                    {bank[rowIndex]}
                  </Text> <Box as="button"
                          onClick={() => handleCopy(bank[rowIndex])}><IoCopyOutline/></Box></HStack>
                  )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

// import React from 'react';
// import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

// const orderTypeColors = {
//   "Type 1": "blue.500",
//   "Type 2": "green.500",
//   "Type 3": "red.500",
//   // Add more types and colors as needed
// };

// const TAbleuser = ({ headers, data }) => {
//   return (
//     <Box p={5}>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             {headers.map((header, index) => (
//               <Th key={index}>{header}</Th>
//             ))}
//             <Th>Order Type</Th> {/* Add Order Type header */}
//           </Tr>
//         </Thead>
//         <Tbody>
//           {data.map((item, index) => (
//             <Tr key={index}>
//               <Td>{item.customerInfo}</Td>
//               <Td>{item.email}</Td>
//               <Td>{item.kycLevel}</Td>
//               <Td>{item.transactions}</Td>
//               <Td>
//                 <Text fontWeight="bold" color={orderTypeColors[item.orderType]}>
//                   {item.orderType}
//                 </Text>
//               </Td> {/* Style Order Type */}
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

// export default TAbleuser;
