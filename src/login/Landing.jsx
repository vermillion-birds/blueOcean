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
            class="motionBird"
            style={{ display: 'flex' }}
            animate={{ x: [0, 100, -100], rotateY: 180 }}
            transition={{ duration: 5, repeat:"Infinity" }}
          >
            {/* <FlyingBird /> */}
            <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" />
          </motion.div>
        </div>
        {/* <div>
          <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" />
        </div> */}
        <LandingButton onClick={() => login()}>Login</LandingButton>
        {/* <div>Don't Have An Account?</div> */}
        {/* <LandingButton onClick={() => { addUser(); }}>Create Account</LandingButton> */}
        {/* {addUserToggle
        && <UserSignUp setAddUserToggle={setAddUserToggle} />} */}
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
