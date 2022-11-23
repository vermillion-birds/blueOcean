/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';

const FriendEntry = ({chatClicked, birdClicked}) => {
  return (
    <div>
      <span>{':)'}</span>
      <span>Friends Name</span>
      <button>Chat With Friend</button>
      <button>See Friends Cards</button>
    </div>
  )
}

export default FriendEntry;
