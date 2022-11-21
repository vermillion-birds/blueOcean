/* eslint-disable react/function-component-definition */
import React from 'react';
import styled, { css } from 'styled-components';

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

const AccountPage = ({ logoutWithRedirect, test }) => {
  console.log(test)
  return (
  <Container>
    <div>Account Information</div>
    <button>Update Account</button>
    <button onClick={() => logoutWithRedirect()}>Log Out</button>
    <button>My Birds</button>
    <button>My Friends</button>
  </Container>
  )
};

export default AccountPage;
