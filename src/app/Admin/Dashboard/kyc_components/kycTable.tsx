"use client";

import {
  Box,
  Text,
  Tbody,
  Td,
  Thead,
  Tr,
  Table,
  Th,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoFilterSharp } from "react-icons/io5";
import {
  MdCircle,
  MdCoPresent,
  MdCopyAll,
  MdCopyright,
  MdFmdBad,
  MdGppBad,
  MdGppGood,
} from "react-icons/md";
// import { GrStatusGood } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";

export default function KycTable({
  headers,
  data,
  bank,
}: {
  headers: any;
  data: any;
  bank: any;
}) {
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
        <Table>
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
                    // w={cellIndex === 1 ? "full" : ""}
                    key={cellIndex}
                    color={
                      (cellIndex === 2 && value !== "not verified") ||
                      cellIndex === 3 ||
                      cellIndex === 4
                        ? "#2F7F37"
                        : cellIndex === 2 && value == "not verified"
                        ? "#FF4834"
                        : "#000000"
                    } // Conditional color
                    fontSize={"12px"}
                    fontWeight={"600"}
                    //   bg={cellIndex === 2 ? 'yellow.200' : 'transparent'}  // Conditional background color
                  >
                    {cellIndex === 0 && value == "completed" ? (
                      <Box rounded={"10px"} p={"2px"} bg={"#C7EED5"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#2F7F37" />
                          <Text color="#2F7F37" fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : cellIndex === 0 && value == "started" ? (
                      <Box rounded={"10px"} p={"2px"} bg={"#FCF2C1"} w={"80%"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#B59803" />
                          <Text color={"#B59803"} fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : cellIndex === 0 && value == "not started" ? (
                      <Box rounded={"10px"} p={"2px"} bg={"#FF48341A"}>
                        <HStack gap={"3px"}>
                          <MdCircle size={"10px"} color="#FF4834" />
                          <Text color="#FF4834" fontSize={"12px"}>
                            {" "}
                            {value}
                          </Text>
                        </HStack>
                      </Box>
                    ) : (
                      value
                    )}
                    {(cellIndex === 2 && value !== "not verified") ||
                    cellIndex === 3 ||
                    cellIndex === 4 ? (
                      <MdGppGood
                        style={{
                          display: "inline",
                          marginLeft: "8px",
                          color: "green",
                        }}
                      />
                    ) : cellIndex === 2 && value == "not verified" ? (
                      <MdGppBad
                        style={{
                          display: "inline",
                          marginLeft: "8px",
                          color: "#FF4834",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {cellIndex === 0 && (
                      <Text
                        color={"#71717A"}
                        fontSize={"10px"}
                        fontWeight={"500"}
                      >
                        {bank[rowIndex]}
                      </Text>
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
