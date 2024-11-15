import {
  Box,
  HStack,
  Text,
  Image,
  Flex,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderMinus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import React from "react";
import navItems from "./navitem";
import NavLink from "./navLink";
import { useAdminContext } from "../Admin/Admincontext";
import { useCryptoContext } from "../components/drawer/Buy/usecontextbuy";
import AllNotification from "../Notification_component/allNotification";

export default function NavbarTwo() {
  const { userProfile, setUserProfile } = useCryptoContext();
  const { NotificationCount,
    setNotificationCount
  } = useCryptoContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenNotification = () => {onOpen()};
  
  return (
    <>
      <Box>
        <Flex
          px={["20px", "72px"]}
          pt={["30px", "28px"]}
          pb={["30px", "24px"]}
          justifyContent={"space-between"}
        >
          <Box>
            <HStack gap={"72px"}>
              <HStack gap={"5px"}>
                <Link href="/settings">
                  <Image
                    height="18px"
                    width="15px"
                    objectFit="cover"
                    src="/image/greenlogo.png"
                    alt="Bebo"
                  />
                </Link>

                <Box height="15px" width="46px">
                  <Image src="/image/Bebogreen.png" alt="Bebo" />
                </Box>
              </HStack>

              <HStack gap={"40px"}>
                {navItems.map((item) => (
                  <NavLink key={item.title} items={item} />
                ))}
              </HStack>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"16px"}>
              <Box>
                <Link href="/settings">
                  <Image
                    boxSize={["35px", "30px"]}
                    rounded={"50%"}
                    objectFit="cover"
                    src={
                      userProfile.image ||
                      "https://img.icons8.com/office/50/gender-neutral-user.png"
                    }
                    alt="Dan Abramov"
                  />
                </Link>
              </Box>
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

              <Box
                position="relative"
                cursor="pointer"
                display={{ base: "block", md: "none" }}
                onClick={handleOpenNotification}
              >
                <FaBell size="25px" />
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

            </HStack>
          </Box>
        </Flex>
      </Box>
      <AllNotification isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
