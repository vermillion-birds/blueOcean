/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useState, useEffect} from 'react';
import FriendEntry from './FriendEntry.jsx';
import BirdList from './BirdList.jsx';// remove whole line
import Chat from './Chat.jsx';

const FriendsList = ({userID, allUsers, home}) => {
  const [friendSearch, setFriendSearch] = useState('');
  const [suggestions, setSuggestions] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [birdsView, setBirdsView] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [clickedFriend, setClickedFriend] = useState({});
  const sample = ['name1', 'name2', 'name3'];

  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  };

  const onSuggestions = () => {
    setSuggestions(!suggestions);
    setSuggestedFriends(sample);
  };

  const onBirdClick = (friend) => {
    friend = friend || {};
    setClickedFriend(friend);
    setBirdsView(!birdsView);
  };

  const onChatClicked = (friend) => {
    friend = friend || {};
    setClickedFriend(friend);
    setChatView(!chatView);
  }

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
      {(!birdsView && !chatView) && (
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
        {[1, 1, 1].map((bird, i) => {
          return (<FriendEntry key={i} chatClicked={(friend) => {onChatClicked(friend)}}
            birdClicked={(friend) => { onBirdClick(friend); }} />);
        })}
      </div>
      )}
      {birdsView && <BirdList friend={clickedFriend} back={() => {onBirdClick()}} userID={userID} home={home()} />}
      {chatView && <Chat friend={clickedFriend} userID={userID} back={() => {onChatClicked()}} allUsers={allUsers} home={home()} />}

    </div>
  );
};

export default FriendsList;

// import FriendsList from './FriendsList.jsx';//remove whole line
//  <FriendsList />{/*//remove whole line */}
