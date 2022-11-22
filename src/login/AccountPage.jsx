/* eslint-disable react/function-component-definition */
import React from 'react';
import styled, { css } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

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
`;

const AccountPage = () => {
  const history = useHistory();
  const { logout } = useAuth0();
  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });
  return (
    <Container>
      <div>Account Information</div>
      <button>Update Account</button>
      <button onClick={() => logoutWithRedirect()}>Log Out</button>
      <button onClick={()=> history.push('/birdList')}>My Birds</button>
      <button>My Friends</button>
    </Container>
  );
};

export default AccountPage;
