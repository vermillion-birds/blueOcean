/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';

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
  height: 600px;
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

const Input = styled.input`
  margin: 15px;
`;

const UserSignUp = ({ globalUser }) => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (submitData) => {
    if (globalUser.email === submitData.email) {
      submitData.profilePicture = '';
      history.push('/user');
      axios.post('/addUser', submitData)
        .then((data) => {
          console.log('activated post', data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Your email address must match the email you entered in your login page');
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <form onSubmit={handleSubmit((data) => {
          submitForm(data);
        })}
        >
          <p style={{ margin: '0px' }}><Icon icon="mdi:bird" color="#d9f0ff" width="100" height="100" /></p>
          <div>First Name</div>
          <Input {...register('firstName', { required: true })} type="text" placeholder="First Name" />
          {errors.firstName?.type === 'required' && <Error role="alert">First name is required</Error>}
          <div>Last Name</div>
          <Input {...register('lastName', { required: true })} type="text" placeholder="Last Name" />
          {errors.lastName?.type === 'required' && <Error role="alert">Last name is required</Error>}
          <div>User Name</div>
          <Input {...register('userName', { required: true })} type="text" placeholder="User Name" />
          {errors.userName?.type === 'required' && <Error role="alert">User name is required</Error>}
          <div>Email Address</div>
          <Input {...register('email', { required: true })} type="email" placeholder="Email Address" />
          {errors.email?.type === 'required' && <Error role="alert">Email is required</Error>}
          <div>Zip Code</div>
          <Input {...register('zipCode', { required: true, maxLength: 5, minLength: 5 })} type="integer" placeholder="Zip Code" />
          {errors.zipCode?.type === 'required' && <Error role="alert">Zip Code is required</Error>}
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button style={{ rightMargin: '5px' }} type="submit">Submit</button>
          </div>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserSignUp;
