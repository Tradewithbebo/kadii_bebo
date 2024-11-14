import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'
import { AxiosGet } from '../axios/axios';
interface Notification {
    title: string;
    date: string;
    content: string;
    createdAt:any;
    read:boolean
    _id:any
  }
  
  type Modalopenin = {
    isOpen: any;
    onOpen: any;
    onClose: any;
    transactionId:any
  };
export default function Notification({ isOpen, onOpen, onClose,transactionId }: Modalopenin) {
    const url2=`notifications/${transactionId}/read`
    const [Notifx, setNotifx] = useState<Notification>();
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
  return (
    <div> <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* <Lorem count={2} /> */}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal></div>
  )
}
