/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UpdateForm from './UpdateForm.jsx';

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-content: space-evenly;
  height: 500px;
  width: 500px;
  background-color: #686868;
  border:solid;
  border-radius: 25px;
  box-shadow: 5px 5px 10px;
`;

const AccountPage = ({ globalUser, setGlobalUser }) => {
  const [update, setUpdate] = useState(false);
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const { logout, user } = useAuth0();
  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });

  useEffect(() => {
    axios.get('/getUser', { params: { email: globalUser.email } })
      .then((data) => {
        setUserName(data.data[0].username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [globalUser]);

  const updateUser = () => {
    setUpdate(!update);
  };

  return (
    <>
      {update
      && <UpdateForm globalUser={globalUser} setUpdate={setUpdate} update={update} />}
      <Container>
        {globalUser
      && (
      <div style={{
        fontSize: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <div style={{ paddingBottom: '20px' }}>{userName}</div>
        <img referrerPolicy="no-referrer" alt="profile" style={{ borderRadius: '50%', height: '70px', width: '70px' }} src={globalUser.picture} />
      </div>
      )}
        <button type="button" onClick={() => updateUser()}>Update Account</button>
        <button type="button" onClick={() => logoutWithRedirect()}>Log Out</button>
        <button type="button" onClick={() => history.push('/birdList')}>My Birds</button>
        <button type="button" onClick={() => history.push('/friendsList')}>My Friends</button>
      </Container>
    </>
  );
};

export default AccountPage;
