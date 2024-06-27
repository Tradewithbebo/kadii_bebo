'use client'
import { Container, background } from '@chakra-ui/react';
import React from 'react'
import Select from 'react-select'
import { color } from 'framer-motion';
export const myStyles ={
  control:(baseStyles: any , state: any)=>({
    ...baseStyles,
    border:" 2px solid #2e374a",
    backgroundColor:'transparent',
    borderRadius:'10px',
    width:'100%',
    // height:'800px',
    padding:"23px",
    outline: 'none',
    '&:hover': {
      border: '2px solid #2e374a',
      outline: 'none',
       // Replace with the desired hover color
    },
    '&:focus': {
      border: '2px solid #2e374a', 
      outline: 'none',// Replace with the desired focus color
    },
  

  }),
  placeholder:(baseStyles: any, state: any)=>({
    ...baseStyles,
    // color:"red"
  }),
  container:(baseStyles: any, state: any)=>({
    ...baseStyles,
   color:'black'
  // backgroundColor:'#2e374a'
  }),
  singleValue:(baseStyles: any, state: any)=>({
    ...baseStyles,
   color:'white'
  // backgroundColor:'#2e374a'
  }),
}