import { Box, HStack, Text, Image, Flex, Divider, useDisclosure } from "@chakra-ui/react";
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderMinus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import React from "react";
import navItems from "@/app/navbar/navitem";
import NavLink from "@/app/navbar/navLink";
import Search from "../Search/search";
import { useAdminContext } from "../../Admincontext";
import AllNotification from "../../Notification_component/allNotification";

export default function NavbarTwo() {
  const { NotificationCount,
    setNotificationCount
  } = useAdminContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenNotification = () => {onOpen()};
  return (
   <Box  w={'100%'}>
     <Flex  w={'100%'}
       pt={'23px'}
       mb={'23px'}
       pl={'49px'}
       pr={'54px'}
       >
      <Box w={'100%'}>
        <Box justifyContent={'space-between'} display={'flex'}>
          <HStack gap={"5px"}>
            <Image
              height="18px"
              width="15px"
              objectFit="cover"
              src="/image/greenlogo.png"
              alt="Bebo"
            />
            <Box height="15px" width="46px">
              <Image src="/image/Bebogreen.png" alt="Bebo" />
            </Box>
          </HStack>
          <Box w={'60%'}><Search placeholder={"Type to search"}/></Box>
          <HStack gap={'20px'}>
          <Box
                position="relative"
                cursor="pointer"
                display={{ base: "none", md: "block" }}
                onClick={handleOpenNotification}
              >
                <FaBell size="18px" />
                <Text
                  position="absolute"
                  top="-4px"
                  right="-4px"
                  fontSize="xs"
                  fontWeight="bold"
                  color="red.500"
                  backgroundColor="white"
                  borderRadius="50%"
                  padding="0 4px"
                >
                  {NotificationCount}
                </Text>
              </Box>
              <Box>
            <Image
    boxSize={['35px','30px']}
    rounded={'50%'}
    objectFit='cover'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />  
            </Box>
           
          </HStack>
        </Box>
        
      </Box>
    </Flex>
    <Box>
          <Divider orientation='horizontal' />
          </Box>
          <AllNotification isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
   </Box>
  );
}
