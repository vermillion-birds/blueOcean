/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';

const FriendEntry = ({chatClicked, birdClicked, friend}) => {
  return (
    <div>
      <span>{':)'}</span>
      <span>{`${friend.first_name} ${friend.last_name}`}</span>
      <button onClick={() => {chatClicked(friend)}}>{`Chat With ${friend.first_name}`}</button>
      <button onClick={() => {birdClicked(friend)}}>{`See ${friend.first_name}'s Cards`}</button>
    </div>
  )
}

export default FriendEntry;
