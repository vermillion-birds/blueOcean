/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
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

const UserSignUp = () => {
  const [firstNameForm, setFirstName] = useState(null);
  const [lastNameForm, setLastName] = useState(null);
  const [emailForm, setEmail] = useState(null);
  const [userNameForm, setUserName] = useState(null);
  const [zipCodeForm, setZipCode] = useState(0);
  const [profilePictureForm, setProfilePicture] = useState(null);
  const history = useHistory();

  const submitForm = () => {
    const newUser = {
      firstName: firstNameForm,
      lastName: lastNameForm,
      userName: userNameForm,
      email: emailForm,
      zipCode: zipCodeForm,
      profilePicture: profilePictureForm,
    };
    history.push('/user');
    axios.post('/addUser', newUser)
      .then((data) => {
        console.log('activated post', data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = () => {
    history.push('/user');
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <form>
          <button type="button" onClick={() => { cancel(); }}>Cancel</button>
          <div>First Name</div>
          <input required onChange={(e) => { setFirstName(e.target.value); }} type="text" placeholder="First Name" />
          <div>Last Name</div>
          <input required onChange={(e) => { setLastName(e.target.value); }} type="text" placeholder="Last Name" />
          <div>User Name</div>
          <input required onChange={(e) => { setUserName(e.target.value); }} type="text" placeholder="User Name" />
          <div>Email Address</div>
          <input required onChange={(e) => { setEmail(e.target.value); }} type="email" placeholder="Email Address" />
          <div>Zip Code</div>
          <input required onChange={(e) => { setZipCode(e.target.value); }} type="number" placeholder="Zip Code" />
          <div>Profile Picture</div>
          <button type="submit" onClick={() => { submitForm(); }}>Submit</button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserSignUp;
