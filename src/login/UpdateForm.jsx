/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ModalBackground = styled.div`{
  width: 100%;
  height: 100%;
  background-color: #2d5d7b;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 1;
}`;

const ModalContainer = styled.div`{
  button {
    border:none;
  }
  .upload {
    border:solid;
  }
  width: 500px;
  height: 500px;
  border:solid;
  border-radius: 25px;
  background-color: #686868;
  box-shadow: 5px 5px 10px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  font-size: 24px;

}`;

const UpdateForm = ({ setUpdate, update, globalUser }) => {
  const [firstNameForm, setFirstName] = useState('');
  const [lastNameForm, setLastName] = useState('');
  const [emailForm, setEmail] = useState('');
  const [userNameForm, setUserName] = useState('');
  const [zipCodeForm, setZipCode] = useState(0);
  const [profilePictureForm, setProfilePicture] = useState('');
  const [user, setUser] = useState({});
  const history = useHistory();
  const [userSet, setUserSet] = useState(false);

  useEffect(() => {
    axios.get('/getUser', { params: { email: globalUser.email } })
      .then((data) => {
        setUser(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setUserSet(true);
  }, [user]);

  const submitForm = () => {
    const newUser = {};
    if (firstNameForm.length > 0) {
      newUser['firstName'] = firstNameForm;
    }
    if (lastNameForm.length > 0) {
      newUser['lastName'] = lastNameForm;
    }
    if (userNameForm.length > 0) {
      newUser['userName'] = userNameForm;
    }
    if (emailForm.length > 0) {
      newUser['email'] = emailForm;
    }
    if (zipCodeForm.length !== 0) {
      newUser['zipCode'] = firstNameForm;
    }

    history.push('/user');
    axios.put('/updateUser', newUser)
      .then((data) => {
        console.log('updated user');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = () => {
    setUpdate(!update);
  };

  return (
    <ModalBackground>
      <ModalContainer>
        {userSet
        && (
        <>
          <div>Update Your Account</div>
          <form>
            <button type="button" onClick={() => { cancel(); }}>Cancel</button>
            <div>First Name</div>
            <input defaultValue={user.first_name} required onChange={(e) => { setFirstName(e.target.value); }} type="text" />
            <div>Last Name</div>
            <input defaultValue={user.last_name} required onChange={(e) => { setLastName(e.target.value); }} type="text" placeholder="Last Name" />
            <div>User Name</div>
            <input defaultValue={user.username} required onChange={(e) => { setUserName(e.target.value); }} type="text" placeholder="User Name" />
            <div>Email Address</div>
            <input defaultValue={user.email} required onChange={(e) => { setEmail(e.target.value); }} type="email" placeholder="Email Address" />
            <div>Zip Code</div>
            <input defaultValue={user.user_location} required onChange={(e) => { setZipCode(e.target.value); }} type="number" placeholder="Zip Code" />
            <div>Profile Picture</div>
            <button type="submit" onClick={() => { submitForm(); }}>Submit</button>
          </form>
        </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default UpdateForm;
