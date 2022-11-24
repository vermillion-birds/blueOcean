/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import AccountPage from './AccountPage.jsx';
import UserSignUp from './UserSignUp.jsx';
import chirp from '../assets/birds-chirping-04-6771.mp3';

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-content: space-evenly;
  height: 500px;
  width: 500px;
  background-color: #686868;
  border:solid;
  border-radius: 25px;
  box-shadow: 5px 5px 10px;
  opacity: .95;
`;

const LandingButton = styled.button`
  height: 100px;
  width: 200px;
`;

const userdb = {
  firstName: 'brian',
  lastName: 'stern',
  email: 'sterno2510@gmail.com',
  username: 'sterno2510',
  profileurl: '',
  zipcode: '08901',
};

const Landing = ({ setGlobalUser, globalUser }) => {
  const [addUserToggle, setAddUserToggle] = useState(false);
  const history = useHistory();
  const audio = new Audio(chirp);
  audio.loop = true;

  const play = () => {
    audio.play();
  };

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });

  const login = () => {
    loginWithRedirect({});
  };

  useEffect(() => {
    if (user) {
      setGlobalUser(user);
      axios.get('/userInfo', { params: { email: user.email } })
        .then((data) => {
          if (data.data[0] !== undefined) {
            history.push('/user');
            console.log('send to account page');
          } else {
            console.log('DATA IN ELSE', data);
            history.push('/createUser');
            console.log('send to create user page');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const addUser = () => {
    setAddUserToggle(true);
  };

  return (
    <>
      {!isAuthenticated
      && (
      <Container>
        <div className="outermotion">
          <h1>Birder</h1>
          <motion.div
            style={{ display: 'flex' }}
            animate={{ x: [-140, 155, -140], y: [0, 20, -170, -170, 0], rotateY: [0, 180, 0] }}
            transition={{ duration: 7, repeat: 'Infinity' }}
            whileHover={{
              scale: 2,
            }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" />
          </motion.div>
        </div>
        <LandingButton onClick={() => login()}>Login</LandingButton>
        <button type="button" onClick={() => play()}>Full User Experience</button>
      </Container>
      )}
      {isAuthenticated
      && (
      <AccountPage
        logoutWithRedirect={logoutWithRedirect}
        globalUser={globalUser}
        setGlobalUser={setGlobalUser}
      />
      )}
    </>
  );
};

export default Landing;
