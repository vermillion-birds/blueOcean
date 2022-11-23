import React, {useState} from 'react';
import styled from 'styled-components';
import ChatUsers from './ChatUsers.jsx';
import ChatWelcomeScreen from './ChatWelcomeScreen.jsx';
import ChatContainer from './ChatContainer.jsx';

function Chat () {
  const [users, setUsers] = useState(['First user', 'Second User', 'Third User', 'Fourth user', 'First user', 'Second User', 'Third User', 'Fourth user']);
  const [currentUser, setCurrentUser] = useState(undefined);
  return (
  <OuterContainer>
    <div className="innerContainer">
    <img style={{position: "absolute", height: "5em"}} src='https://i.pinimg.com/originals/7e/58/c4/7e58c42bd5c6bbe05a1d49ee9737f909.gif' alt="logo" />
      <ChatUsers users={users} currentUser={currentUser} />
      {/* <ChatWelcomeScreen /> */}
      <ChatContainer />
    </div>
  </OuterContainer>
  );
};

const OuterContainer = styled.div`
margin: 50px;
height: 68vh;
width: 68vw;
display: flex;
flex-direction: column;
justify-content: center;
// gap: 1rem;
align-items: center;
background-color: #467693;
.innerContainer {
  height: 65vh;
  width: 65vw;
  display: grid;
  background-color: #2D5D7B;
  grid-template-columns: 25% 75%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`

export default Chat;