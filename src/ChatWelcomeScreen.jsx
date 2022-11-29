import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ChatWelcomeScreen = function () {
  return (
    <WelcomeContainer>
      <img src='https://media.tenor.com/PN7Bccnho5wAAAAi/penguin-hi.gif' alt="" />
      <h1 style={{fontSize: '3.5vw'}}>
        Welcome
      </h1>
      <h2 style={{fontSize: '2vw'}}>Please select a chat to Start messaging.</h2>
    </WelcomeContainer>
  )
};

export default ChatWelcomeScreen;

const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    max-width: 100%;
    height: auto;
  }
`;