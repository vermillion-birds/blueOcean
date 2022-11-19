import React, { useState, useEffect } from 'react'
import './assets/App.css';
import Landing from './login/Landing.jsx';
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';

export default function App() {

  return (
    <>
     <motion.div style={{alignItems:'left'}}
      animate={{ x: "calc(100vw - 50%)" }}
      transition={{ duration: 20 }}>
        <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100"/>
      </motion.div>
      <h1>Birder</h1>
      <Landing />
    </>
  );
}
