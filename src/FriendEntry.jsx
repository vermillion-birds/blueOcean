/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import './assets/FriendList.css';

const RoundImage = styled.div`
  border-radius: 50%;
  background-image: url(${props => props.img});
  background-position: center;
  background-size:cover;
    margin: 10px;
    height: 45px;
    width: 45px;
  object-fit: cover;
`;


const FriendEntry = ({chatClicked, birdClicked, friend}) => {
  return (
    <div className="friend">
      <RoundImage img={friend.profile_url} />
      <span className="friends-name">{`${friend.first_name} ${friend.last_name}`}</span>
      <div className="button-container-friend">
      <button onClick={() => {chatClicked(friend)}} className="friend-button-chat">{`Chat`}</button>
      <button onClick={() => {birdClicked(friend)}} className="friend-button-bird">{`Birds`}</button>
      </div>
    </div>
  )
}

export default FriendEntry;
