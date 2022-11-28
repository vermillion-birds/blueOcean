/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import './assets/App.css';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './login/Landing.jsx';
// import backgroundVideo from './assets/106433-bird-flock-test.mp4';
// import FlyingBird from './assets/101335-parrot.gif';
import ImageUpload from './imageUpload/ImageUpload.jsx'
const App = ({ globalUser, setGlobalUser }) => (
  <>
    <video autoPlay loop muted id="video">
      <source src={require('./assets/mixkit-flock-of-seagulls-in-the-sky-17978-medium.mp4').default} type="video/mp4" />
    </video>
    {/* <img id='parrot' src={require( './assets/101335-parrot.gif').default} /> */}
    <Landing globalUser={globalUser} setGlobalUser={setGlobalUser} />
  </>

);

export default App;
