import { GridItem, SimpleGrid, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function IfNotransaction() {
  return (
    <div>
      <SimpleGrid
        px={["10px", "16px", "24px"]}
        w={["100%", "450px", "668px"]}
        columns={1}
        h={["60dvh", "65dvh"]}
        justifyContent="center"
        alignItems={'center'}
      >
        <GridItem w="full" display="flex" justifyContent="center">
          <VStack justifyContent="center" w="full" spacing={4}>
            <Image
              borderRadius="full"
              boxSize={["40%", "50%", "60%"]}
              src="/image/searchfailed.svg"
              alt="No transactions illustration"
            />
            <Text
              textAlign="center"
              color="#021D17"
              fontWeight="600"
              fontSize={["18px", "20px", "24px"]}
            >
              No transactions yet
            </Text>
            <Text
              textAlign="center"
              color="#808080"
              fontWeight="500"
              fontSize={["14px", "16px", "18px"]}
              px={["20px", "0px"]}
            >
              Start buying and selling to see your transactions
            </Text>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </div>
  );
}
