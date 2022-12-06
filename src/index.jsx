/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
// Bring React in to build a component.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM, { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router, Route, Switch, useHistory,
} from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from './login/auth0-provider-with-history.jsx';
import AccountPage from './login/AccountPage.jsx';
import UserSignUp from './login/UserSignUp.jsx';
import BirdList from './BirdList.jsx';
import FriendsList from './FriendsList.jsx';
import Discover from './Discover.jsx';
// Import from react-dom the ability to create a root render
import App from './App.jsx';
import './assets/index.css';

const MainComponent = () => {
  const [globalUser, setGlobalUser] = useState({});
  const [userID, setUserID] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [allBirds, setAllBirds] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const history = useHistory();

  const returnToAccountPage = () => {
    history.push('/user');
  };

  useEffect(() => {
    const data = window.localStorage.getItem('globalUser');
    if (data !== null) {
      setGlobalUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('globalUser', JSON.stringify(globalUser));
  }, [globalUser]);

  useEffect(() => {
    const data = window.localStorage.getItem('userID');
    const friendsData = window.localStorage.getItem('frindsList');
    if (data !== null) {
      setUserID(JSON.parse(data));
    }
    if (friendsData !== null) {
      setFriendsList(JSON.parse(friendsData));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('userID', JSON.stringify(userID));
  }, [userID]);

  useEffect(() => {
    window.localStorage.setItem('friendsList', JSON.stringify(friendsList));
  }, [friendsList]);

  useEffect(() => {
    axios.get('/allUsers')
      .then((data) => {
        setAllUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('/userID', { params: { email: globalUser.email } })
      .then((data) => {
        setUserID(data.data[0].user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [globalUser]);

  const getFriendsList = () => {
    axios.get(`/friendsList/${userID}`)
      .then((data) => {
        // console.log('friends? ', data);
        setFriendsList(data.data);
      })
      .catch((err) => {
        console.log(err, 'error in getFriendsList');
      });
  };

  useEffect(() => {
    axios.get('/birds')
      .then((data) => {
        // console.log('birds? ', data.data);
        setAllBirds(data.data);
      })
      .catch((err) => {
        console.log(err, 'error in getAllBirds');
      });
    getFriendsList();
  }, [userID]);

  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          <Route path="/user">
            {' '}
            <AccountPage setGlobalUser={setGlobalUser} globalUser={globalUser} />
            {' '}
          </Route>
          <Route path="/createUser">
            <UserSignUp globalUser={globalUser} />
          </Route>
          <Route exact path="/">
            <App globalUser={globalUser} setGlobalUser={setGlobalUser} userID={userID} setUserID={setUserID} />
            {' '}
          </Route>
          <Route path="/birdList">
            <BirdList userID={userID} allBirds={allBirds} />
          </Route>
          <Route path="/discover">
            <Discover allBirds={allBirds} />
          </Route>
          <Route path="/friendsList">
            <FriendsList userID={userID} allUsers={allUsers} home={returnToAccountPage} friendsList={friendsList}
            updateFriends={() => {getFriendsList()}} globalUser={globalUser}/>
          </Route>
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

// create the root of the app by selection where the app should be mounted in the dom
ReactDOM.createRoot(document.getElementById('root')).render(
  <MainComponent />,
);
