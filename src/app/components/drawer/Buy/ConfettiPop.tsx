import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiPop = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Start confetti after 2 seconds
    const startTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 2000); // 2 seconds delay

    // Stop confetti after 40 seconds from start
    const stopTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 42000); // 42 seconds total (2 seconds delay + 40 seconds duration)

    // Cleanup the timers when the component unmounts
    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
//     <Box
//     width="100px"   // Match the width of the image
//     height="100px"  // Match the height of the image
//     // borderRadius="50%"  // Adjust this value for the desired radius
//     overflow="hidden"  // Ensure the confetti stays within the rounded box
//     position="relative" 
//     border={'none'}// Positioning for the Confetti component
//   >
    <Confetti
    //   width={100}   // Match the width of the Box
    //   height={100}  // Match the height of the Box
    //   numberOfPieces={100}  // Adjust the number of pieces if necessary
    />
//   </Box>
  );
};

export default ConfettiPop;
