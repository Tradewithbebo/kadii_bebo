import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  HStack,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoDotFill } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io"; // Example alternate icon
import { AxiosGet } from "../axios/axios";

type Modalopenin = {
  isOpen: any;
  onOpen: any;
  onClose: any;
};

interface Notification {
  title: string;
  date: string;
  content: string;
  createdAt:any;
  read:boolean
  _id:any
}



export default function AllNotification({ isOpen, onOpen, onClose }: Modalopenin) {

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'transaction completed':
        return { bg: "#C7EED5", color: "#2F7F37" };
      case 'transaction progress':
        return { bg: "#FCF2C1", color: "#B59803" };
      case 'transaction failed':
        return { bg: "#FF48341A", color: "#FF4834" };
      default:
        return { bg: "transparent", color: "#000000" };
    }
  };
  const [Notifx, setNotifx] = useState<Notification[]>([]);
  const [readNotifications, setReadNotifications] = useState<number[]>([]);

  // const [Notifx, setNotifx] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionId, setTransactionId] = useState(null);
  const [pages, setPages] = useState<number>(1);
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };
  
  const url = `notifications?page=${pages}`;

  const fetchNotifx = async () => {
    try {
      const res = await AxiosGet(url);

      if (res.data) {
        console.log("Notifx", Notifx);
        setNotifx(res.data.items);
        setTotalPages(res.data.meta.totalPages); // Set total pages from response meta
      }
    } catch (error) {
      console.error(error);
    }
  };
const url2=`notifications/${transactionId}/read`
  const fetchNotfxById= async () => {
    try {
      const res = await AxiosGet(url2);

      if (res.data) {
        console.log("Notifx", Notifx);
        setNotifx(res.data);
        // setTotalPages(res.data.meta.totalPages); // Set total pages from response meta
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifx();
  }, [pages, totalPages]);




  // useEffect(() => {
  //   setNotifx(mockNotifications);
  // }, []);

  // const handleNotificationClick = (index: number) => {
  //   if (!readNotifications.includes(index)) {
  //     setReadNotifications((prev) => [...prev, index]);
  //   }
  // };
const handleNotificationClick=(id:any)=>{
  setTransactionId(id)
}
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notification</DrawerHeader>

          <DrawerBody>
            <Text fontSize={"18px"} fontWeight={"600"} color={"#808080"} pb={"20px"}>
              Get notified on the new updates
            </Text>

            {Notifx.map((notification, index) => {
              const isRead = notification?.read===true

              return (
                <Button
                  key={index}
                  mb={'16px'}
                  w={'fit-content'}
                  py={"55px"}
                  bg={isRead ? "#F8F8F8" : "#F0F0F0"} // Gray background if read
                  color={isRead ? "black" : "black"}
                  onClick={() => handleNotificationClick(notification._id)}
                  _hover={{ bg: isRead ? "gray.100" : "gray.100" }}
                >
                  <VStack w={"full"}>
                    <HStack mb={"10px"} w={"full"} display={"flex"} justifyContent={"space-between"}>
                      <HStack w={"full"}>
                        <Box pb={"10px"}>
                          {isRead ? <IoIosCheckmarkCircle size={'14px'} color={getStatusStyle(notification.title).color} /> : <GoDotFill size={'19px'} color={getStatusStyle(notification.title).color} />}
                        </Box>
                        <Box>
                          <Text fontSize={"16px"} fontWeight={"600"}textAlign={"left"}
                        whiteSpace="normal"
                        overflowWrap="break-word"
                        wordBreak="break-word">
                            {notification.title.toLowerCase()}
                          </Text>
                        </Box>
                      </HStack>
                      <Box>
                        <Text
                          pt={"10px"}
                          fontSize={"14px"}
                          fontWeight={"600"}
                          color={isRead ? "black" : "#808080"}
                          w={"full"}
                          display={"flex"}
                          justifyContent={"end"}
                        >
                          {formatDate(notification.createdAt)}
                        </Text>
                      </Box>
                    </HStack>
                    <Box w={"full"} pl={"20px"}>
                      <Text
                        fontSize={"16px"}
                        fontWeight={"600"}
                        color={isRead ? "black" : "#808080"}
                        textAlign={"left"}
                        whiteSpace="normal"
                        overflowWrap="break-word"
                        wordBreak="break-word"
                      >
                        {notification.content.length>64?`${notification.content.slice(0,64)}......`:notification.content}
                      </Text>
                    </Box>
                  </VStack>
                </Button>
              );
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
