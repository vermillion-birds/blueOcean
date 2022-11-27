/* eslint-disable react/prop-types */
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
import { useHistory } from 'react-router-dom';
import './assets/FriendList.css';

const FriendsList = ({userID, allUsers, friendsList}) => {
  const [friendSearch, setFriendSearch] = useState('');
  const [suggestions, setSuggestions] = useState(false);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [birdsView, setBirdsView] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [clickedFriend, setClickedFriend] = useState({});
  const [listState, setListState] = useState([]);
  const sample = ['name1', 'name2', 'name3'];
  const history = useHistory();



  useState(() => {
    if (Array.isArray(friendsList)) {
      setListState(friendsList);
    }
    console.log('friends: ', friendsList);

  }, [friendsList]);

  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  };

  const onSuggestions = () => {
    setSuggestions(!suggestions);
    setSuggestedFriends(allUsers);
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
  };

  useEffect(() => {
    if (friendSearch.length !== 0) {
      setSuggestions(true);
      console.log(friendSearch);
      // sort all users where username or birds sceen name matches term
      const filtered = allUsers.filter((friend) => {
        return (`${friend.first_name} ${friend.last_name}`).toUpperCase().includes(friendSearch.toUpperCase());
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
        <button onClick={() => {history.push('/user')}}>Return Home</button>
        <div>
          <button onClick={onSuggestions}>See Suggested Friends</button>
          <div>
            <input type="text" placeholder="Find Fellow Birders" onChange={onFriendSearch} />
            {suggestions && (
              suggestedFriends.map((friend, i) => {
                return (<div key={i}>{`${friend.first_name} ${friend.last_name}`}</div>);
              })
            )}
          </div>
        </div>
        <h1>Your Friends</h1>
        {listState.map((friend, i) => {
          return (<FriendEntry key={i} friend={friend} chatClicked={(friend) => {onChatClicked(friend)}}
            birdClicked={(friend) => { onBirdClick(friend); }} />);
        })}
      </div>
      )}
      {birdsView && <BirdList friend={clickedFriend} back={() => {onBirdClick()}} userID={userID} />}
      {chatView && <Chat friend={clickedFriend} userID={userID} back={() => {onChatClicked()}} allUsers={allUsers} friendsList={friendsList} />}

    </div>
  );
};

export default FriendsList;

// import FriendsList from './FriendsList.jsx';//remove whole line
//  <FriendsList />{/*//remove whole line */}
