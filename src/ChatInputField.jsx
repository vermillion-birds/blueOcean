import React, {useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const ChatInputField = function ({friendSelected, globalUser, userID, chatMessages, displayMessages, chatId}) {
  const [message, setMessage] = useState('');


  const sendMessage = function (e) {
    e.preventDefault();
    if(message.length > 0) {
      //Have a function that sends the message to the database
      axios.post('/chatId/sendMessage', {
        message: message,
        timestamp: JSON.stringify(new Date().toISOString()),
        currentUser: userID,
        conversationId: chatId
      })
        .then((response) => {
          displayMessages();
        })
        .catch((err) => {
          console.log(response);
        })
    }
    setMessage('');
  };

  return (
    <Container>
    <div className="button-container">
      <div className="emoji">
      <FontAwesomeIcon icon={faSmile} />
      </div>
    </div>
    <form className="input-container" onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        placeholder="type your message here"
        onChange={(e) => {setMessage(e.target.value)}}
        value={message}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  </Container>
  )
};


export default ChatInputField;

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #467693;
  padding: 0 2rem;
  border-radius: 10px;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #D5AD3D;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2D5D7B;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.8rem;
        color: #D9F0FF;
      }
    }
  }
`;
