/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const NewBirdForm = ({ close }) => {
  const [birdName, setBirdName] = useState('');
  const [note, setNote] = useState('');
  const [dateSeen, setDateSeen] = useState('');

  const onBirdName = (e) => {
    setBirdName(e.target.value);
  };

  const onNote = (e) => {
    setNote(e.target.value);
  };

  const onDateSeen = (e) => {
    setDateSeen(e.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const birdInfo = {
      name: birdName,
      note: note,
      dateSeen: dateSeen
    };
    // const form = document.getElementById("bird-form");

    // form.addEventListener('submit', submitForm);

    axios.post('/whatever', birdInfo)
      .then((data) => {
        console.log(data);
        // propably update too
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ModalBackground>
      <ModalContainer>
        <form onSubmit="return false">
          <label>Birds Common Name</label>
          <input type="text" placeholder="ex. cardinal" onChange={onBirdName} />
          <br />
          <label>Personal Note</label>
          <input type="textarea" placeholder="a place to jot down your thoughts on this or future birdsightings" onChange={onNote} />
          <br />
          <label>Date Seen</label>
          <input type="date" onChange={onDateSeen} />
          <br />
          {/*
      photo from cloudinary?
      location? */}
          <button type="submit" onClick={submitForm}>Submit</button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NewBirdForm;
