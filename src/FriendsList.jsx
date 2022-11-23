/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useState, useEffect} from 'react';
import FriendEntry from './FriendEntry.jsx';
import Chat from './Chat.jsx';

const FriendsList = (props) => {
  const [friendSearch, setFriendSearch] = useState('');
  const [suggestions, setSuggestions] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const sample = ['name1', 'name2', 'name3'];

  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  };

  const onSuggestions = () => {
    setSuggestions(!suggestions);
    setSuggestedFriends(sample);
  };

  useEffect(() => {
    if (friendSearch.length !== 0) {
      setSuggestions(true);
      console.log(friendSearch);
      // sort all users where username or birds sceen name matches term
      const filtered = sample.filter((friend) => {
        return friend.toUpperCase().includes(friendSearch.toUpperCase());
      });
      setSuggestedFriends(filtered);
    } else {
      console.log('return to seeing all friends');
      setSuggestions(false);
    }
  }, [friendSearch]);

  return (
    <div>
      <div>
        <button onClick={onSuggestions}>See Suggested Friends</button>
        <div>
          <input type="text" placeholder="Find Fellow Birders" onChange={onFriendSearch} />
          {suggestions && (
            suggestedFriends.map((friend, i) => {
              return (<div key={i}>{friend}</div>);
            })
          )}
        </div>
      </div>
      <h1>Your Friends</h1>
      {[1,1,1].map((bird, i) => {
        return (<FriendEntry key={i} />);
      })}
      <Chat />

    </div>
  );
};

export default FriendsList;

// import FriendsList from './FriendsList.jsx';//remove whole line
//  <FriendsList />{/*//remove whole line */}
