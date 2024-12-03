/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Text,
  useDisclosure,
  useToast,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react'
import { useCryptoContext } from '../drawer/Buy/usecontextbuy'
import { AxiosDelete, AxiosGet } from '@/app/axios/axios'

interface policy{
  isOpen:any,
  onClose :any
}

export default function Policy({ isOpen, onClose }: policy) {
  
  return (
    <>
     <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={["xs", "xs", "sm"]}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Our policies</DrawerHeader>
    <DrawerBody>
     <Accordion items={termsAndPrivacyPolicy}/>
              
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline" mr={3} onClick={onClose}>
        Close
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>


  </> )}




import { Collapse } from "@chakra-ui/react";

export const Accordion = ({ items }: { items: any }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (item: number) => {
    setOpenItem((prevItem) => (prevItem === item ? null : item));
  };

  return (
    <VStack w="full" spacing={4}>
      {items.map((item: any, index: number) => (
        <Box key={index} w="full" borderBottom="1px solid" borderColor="gray.200">
          <Button
            w="full"
            textAlign="left"
            py={4}
            px={2}
            fontSize="lg"
            fontWeight="medium"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="transparent"
            _hover={{ bg: "gray.50" }}
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <Text>{openItem === index ? "−" : "+"}</Text>
          </Button>
          <Collapse in={openItem === index} animateOpacity>
            <Box px={4} py={2} fontSize="sm">
              {item.content}
            </Box>
          </Collapse>
        </Box>
      ))}
    </VStack>
  );
};

const termsAndPrivacyPolicy = [
  {
    title: "Acceptance of Terms",
    content: (
      <div>
        <p>
          By downloading or using this app, you agree to these terms. If you disagree, stop using the app immediately.
        </p>
      </div>
    ),
  },
  {
    title: "Eligibility",
    content: (
      <div>
        <p>
          You must be <strong>18 years or older</strong>, or the legal age of majority in your jurisdiction, to use the app.
        </p>
      </div>
    ),
  },
  {
    title: "User Accounts",
    content: (
      <div>
        <ul>
          <li>To access certain features, you must create an account and provide accurate information.</li>
          <li>You are responsible for maintaining the confidentiality of your login details.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "App Use",
    content: (
      <div>
        <ul>
          <li>Use the app only for lawful purposes.</li>
          <li>Do not disrupt or interfere with others’ use of the app.</li>
        </ul>
      </div>
    ),
  },
  {
    title: <Text >Trading and Financial<br></br> Responsibility</Text>,
    content: (
      <div>
        <ul>
          <li>The app provides tools for trading, which involves risks.</li>
          <li>
            <strong>Tradewithbebo</strong> is not liable for losses or damages from trades or financial decisions made using the app.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <div>
        <p>
          All content, designs, and functionality of the app are owned by <strong>Tradewithbebo</strong> or licensed to us. Do not copy,
          modify, or misuse them.
        </p>
      </div>
    ),
  },
  {
    title: "Prohibited Conduct",
    content: (
      <div>
        <ul>
          <li>Engage in fraud, harassment, or any unlawful activity.</li>
          <li>Reverse-engineer, decompile, or tamper with the app.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Privacy Policy",
    content: (
      <div>
        <p>
          We collect, use, and share your data per our Privacy Policy. By using the app, you consent to this policy.
        </p>
      </div>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <div>
        <p>
          We are not responsible for any damages, including loss of profits or data, caused by your use of the app.
        </p>
      </div>
    ),
  },
  {
    title: "Termination",
    content: (
      <div>
        <p>
          We may terminate or restrict your access at any time if you violate these terms or for other reasons at our discretion.
        </p>
      </div>
    ),
  },
  {
    title: "Governing Law",
    content: (
      <div>
        <p>
          These terms are governed by the laws of the <strong>Federal Republic of Nigeria</strong>. Any disputes will be resolved in
          court of law.
        </p>
      </div>
    ),
  },
  {
    title: "Updates to Terms",
    content: (
      <div>
        <p>
          We may modify these terms occasionally. Changes will take effect when posted in the app. It is your responsibility to stay
          updated.
        </p>
      </div>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <div>
        <p>
          For questions or support, email us at <a href="mailto:info@tradewithbebo.com">info@tradewithbebo.com</a>.
        </p>
      </div>
    ),
  },
  {
    title: "Privacy Policy",
    content: (
      <div>
        <h4>Information We Collect</h4>
        <ul>
          <li>Personal Information: Name, email address, phone number, and account details during registration.</li>
          <li>Usage Data: Information about your interactions with the app, such as features accessed, device type, and IP address.</li>
          <li>Financial Data: If applicable, payment details or transaction history (processed securely).</li>
        </ul>
        <h4>How We Use Your Information</h4>
        <ul>
          <li>Provide and improve app functionality.</li>
          <li>Personalize your experience within the app.</li>
          <li>Communicate updates, offers, and support.</li>
          <li>Ensure security and prevent unauthorized access.</li>
        </ul>
        <h4>Sharing Your Information</h4>
        <ul>
          <li>We do not sell your data. We may share it with:</li>
          <li>Service Providers: Trusted third parties that assist in app operation (e.g., payment processors).</li>
          <li>
            Legal Authorities: If required by law or to protect rights, safety, or property.
          </li>
        </ul>
        <h4>Data Security</h4>
        <p>
          We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, loss, or
          misuse. However, no system is completely secure.
        </p>
        <h4>Your Rights</h4>
        <ul>
          <li>Access, update, or delete your personal data.</li>
          <li>Opt out of marketing communications.</li>
          <li>
            Withdraw consent for data collection, though this may limit app functionality.
          </li>
        </ul>
        <h4>Cookies and Tracking</h4>
        <p>
          The app may use cookies or similar tracking technologies to improve user experience. You can disable cookies in your device
          settings, though some features may not work as intended.
        </p>
        <h4>Third-Party Links</h4>
        <p>
          The app may contain links to third-party websites or services. We are not responsible for their privacy practices, so review
          their policies independently.
        </p>
        <h4>Data Retention</h4>
        <p>
          We retain your data for as long as necessary to provide the app's services and comply with legal obligations.
        </p>
        <h4>Children’s Privacy</h4>
        <p>
          Our app is not intended for users under the age of 18, and we do not knowingly collect their data.
        </p>
        <h4>Updates to This Policy</h4>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted in the app, and it is your responsibility to
          review them periodically.
        </p>
        <h4>Contact Us</h4>
        <p>
          For questions or concerns about this policy, please email us at <a href="mailto:info@tradewithbebo.com">info@tradewithbebo.com</a>.
        </p>
      </div>
    ),
  },
];
