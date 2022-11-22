/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useState, useEffect} from 'react';
import FriendEntry from './FriendEntry.jsx';

const FriendsList = (props) => {
  const [friendSearch, setFriendSearch] = useState('');

  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  };

  useEffect(() => {
    if (friendSearch.length !== 0) {
      console.log(friendSearch);
      // sort all users where username or birds sceen name matches term
    } else {
      console.log('return to seeing all friends');
    }
  }, [friendSearch]);

  return (
    <div>
      <input type="text" placeholder="Find Fellow Birders" onChange={onFriendSearch} />
      <h1>Your Friends</h1>
      {[1,1,1].map((bird, i) => {
        return (<FriendEntry key={i} />);
      })}

    </div>
  );
};

export default FriendsList;

// import FriendsList from './FriendsList.jsx';//remove whole line
//  <FriendsList />{/*//remove whole line */}