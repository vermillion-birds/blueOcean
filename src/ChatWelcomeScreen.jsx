import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ChatWelcomeScreen = function () {
  return (
    <WelcomeContainer>
      <img src='https://media.tenor.com/PN7Bccnho5wAAAAi/penguin-hi.gif' alt="" />
      <h1>
        Welcome
      </h1>
      <h2>Please select a chat to Start messaging.</h2>
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
    height: 20rem;
  }
`;