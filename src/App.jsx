import React, { useState, useEffect } from 'react'
import './assets/App.css';
import Landing from './Landing.jsx';
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';

const Component = React.forwardRef((props, ref) => (
  <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100"ref={ref} />
))
const MovingBird = motion(Component);

export default function App() {

  return (
    <>
     <motion.div style={{alignItems:'left'}}
      initial={{x:50}}
      animate={{ x: "calc(100vw - 50%)" }}
      transition={{ duration: 20 }}>
        <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100"/>
      </motion.div>
      <h1>Birder</h1>
      <Landing />
    </>
  );
}
