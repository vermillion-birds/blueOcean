/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

const Error = styled.p`
  font-size: 10px;
  margin: 1px;
`;

const UserSignUp = () => {
  const [firstNameForm, setFirstName] = useState('');
  const [lastNameForm, setLastName] = useState('');
  const [emailForm, setEmail] = useState('');
  const [userNameForm, setUserName] = useState('');
  const [zipCodeForm, setZipCode] = useState(0);
  const [profilePictureForm, setProfilePicture] = useState('');
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (submitData) => {
    history.push('/user');
    axios.post('/addUser', submitData)
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
        <form onSubmit={handleSubmit((data) => {
          submitForm(data);
        })}
        >
          <button type="button" onClick={() => { cancel(); }}>Cancel</button>
          <div>First Name</div>
          <input {...register('firstName', { required: true })} type="text" placeholder="First Name" />
          {errors.firstName?.type === 'required' && <Error role="alert">First name is required</Error>}
          <div>Last Name</div>
          <input {...register('lastName', { required: true })} type="text" placeholder="Last Name" />
          {errors.lastName?.type === 'required' && <Error role="alert">Last name is required</Error>}
          <div>User Name</div>
          <input {...register('userName', { required: true })} type="text" placeholder="User Name" />
          {errors.userName?.type === 'required' && <Error role="alert">User name is required</Error>}
          <div>Email Address</div>
          <input {...register('email', { required: true })} type="email" placeholder="Email Address" />
          {errors.email?.type === 'required' && <Error role="alert">Email is required</Error>}
          <div>Zip Code</div>
          <input {...register('zipCode', { required: true })} type="number" placeholder="Zip Code" />
          {errors.zipCode?.type === 'required' && <Error role="alert">Zip Code is required</Error>}
          <div>Profile Picture</div>
          <button type="submit">Submit</button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserSignUp;
