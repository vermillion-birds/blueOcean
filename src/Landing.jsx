/* eslint-disable react/function-component-definition */
import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@iconify/react';


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

const LandingButton = styled.button`
  height: 100px;
  width: 200px;
`;

const Landing = () => (
  <Container>
    <div>
      <Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" />
    </div>
    <LandingButton>Login</LandingButton>
    <div>Don't Have An Account?</div>
    <LandingButton>Create Account</LandingButton>
  </Container>
  );

export default Landing;