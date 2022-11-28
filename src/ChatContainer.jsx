import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import ChatInputField from './ChatInputField.jsx';

const ChatContainer = function ({friendSelected, chatMessages, globalUser, userID, displayMessages, chatId}) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
  <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`${friendSelected.profile_url}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{`${friendSelected.first_name} ${friendSelected.last_name}`}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {chatMessages !== undefined ? chatMessages.map((message, idx) => {
          return (
            <div ref={scrollRef} key={idx+message.sender_name}>
              <div className={`message ${
                message.sender_name === `${friendSelected.first_name} ${friendSelected.last_name}` ? `incoming` : `outgoing`
              }`}>
                <div className="content ">
                  <p>{message.message}</p>
                </div>
                </div>
              </div>
              )}) : <></>}
      </div>
      <ChatInputField friendSelected={friendSelected} globalUser={globalUser} userID={userID} chatMessages={chatMessages} displayMessages={displayMessages} chatId={chatId} />
    </Container>
  )
};


const Container = styled.div`
display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.2rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .outgoing {
      justify-content: flex-end;
      .content {
        background-color: #83C9F4;
        color: #535252;
      }
    }
    .incoming {
      justify-content: flex-start;
      .content {
        background-color: #d9f0ff;
        color: #535252;
      }
    }
  }
`;

export default ChatContainer;