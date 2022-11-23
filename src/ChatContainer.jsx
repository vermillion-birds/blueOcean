import React, {useState} from 'react';
import styled from 'styled-components';
import ChatInputField from './ChatInputField.jsx';

const ChatContainer = function ({currentUser}) {
  return (
  <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src="https://www.pngkey.com/png/full/203-2037403_flat-faces-icons-circle-girl-flat-icon-png.png"
              alt=""
            />
          </div>
          <div className="username">
            <h3>UserOne</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
              <div className="message">
                <div className="content ">
                  <p>This is a message</p>
                </div>
              </div>
      </div>
      <ChatInputField />
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
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .content {
      background-color: #264A60;
    }
    // .sended {
    //   justify-content: flex-end;
    //   .content {
    //     background-color: #4f04ff21;
    //   }
    // }
    // .received {
    //   justify-content: flex-start;
    //   .content {
    //     background-color: #9900ff20;
    //   }
    }
  }
`;

export default ChatContainer;