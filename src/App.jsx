/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import './assets/App.css';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './login/auth0-provider-with-history.jsx';
import Landing from './login/Landing.jsx';
// import backgroundVideo from './assets/106433-bird-flock-test.mp4';
import BirdList from './BirdList.jsx';//remove whole line
import FriendsList from './FriendsList.jsx';//remove whole line
import Chat from './Chat.jsx';

const App = () => (
  <Router>
    <Auth0ProviderWithHistory>
      {/* <video autoPlay loop muted id="video">
        <source src={backgroundVideo} type="video/mp4" />
      </video> */}
      <motion.div
        style={{ display: 'flex' }}
        animate={{ x: [0, 425, 200] }}
        transition={{ duration: 10 }}
      >
        <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" />
      </motion.div>
      <h1>Birder</h1>
      <Landing />
      <FriendsList />
      <BirdList />
      <Chat />
    </Auth0ProviderWithHistory>
  </Router>
);

export default App;
