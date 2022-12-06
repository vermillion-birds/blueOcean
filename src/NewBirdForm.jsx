/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
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

const DropDownDiv = styled.div`
{
  border:solid;
  cursor: pointer;
}
`

const NewBirdForm = ({ close, allBirds, userID, birdCards, update }) => {
  const [birdName, setBirdName] = useState('');
  const [note, setNote] = useState('');
  const [dateSeen, setDateSeen] = useState('');
  const [suggestedBirds, setSuggestedBirds] = useState([]);
  const [typeAddress, setTypeAddress] = useState(false);
  const [address, setAddress] = useState({});
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [place, setPlace] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [addressOptions, setAddressOptions] = useState([]);
  const [locationObj, setLocationObj] = useState({});
  const [addressValReturned, setAddressValReturned] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [birdID, setBirdID] = useState(0);
  const [birdSugClicked, setBirdSugClicked] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [birlURL, setBirdURL] = useState('');
  const sample = ['robin', 'blue jay', 'raven'];

  useEffect(() => {
    if (birdName.length !== 0) {
      // console.log(birdName);
      // sort all users where username or birds sceen name matches term
      const filtered = allBirds.filter((bird) => {
        return bird.bird_common_name.toUpperCase().includes(birdName.toUpperCase()) && !(cardList.some((element) => { return bird.bird_id === element.bird_id}));
      });
      if (filtered.length === 1 && filtered[0] === birdName) {
        setSuggestedBirds([]);
      } else {
        setSuggestedBirds(filtered);
      }
    } else {
      setSuggestedBirds([]);
      console.log('done typing bird name');
    }
  }, [birdName]);

  useEffect(() => {
   if (Array.isArray(birdCards)) {
    setCardList(birdCards)
   };

  }, [birdCards])

  // useEffect(() => {
  //   const birdOptions = allBirds.map(bird => {
  //     const newBird = Object.assign({}, bird);
  //     console.log(newBird)
  //     newBird.label = bird.bird_common_name;
  //     return newBird;
  //   })
  //   setSuggestedBirds(birdOptions);
  //   console.log(birdOptions);

  // }, [])

  const onBirdName = (e) => {
    setBirdName(e.target.value);
  };

  const onNote = (e) => {
    setNote(e.target.value);
  };

  const onDateSeen = (e) => {
    setDateSeen(e.target.value);
  };

  const onPlaceName = (e) => {
    setPlaceName(e.target.value);
  };

  const onZip = (e) => {
    setZip(e.target.value);
  };

  const onPlace = (e) => {
    setPlace(e.target.value);
  };

  const onStreet = (e) => {
    setStreet(e.target.value);
  };

  const onState = (e) => {
    setState(e.target.value);
  };

  const typeAddressIn = () => {
    setTypeAddress(!typeAddress);
  };

  const suggestionClicked = (bird) => {
    console.log('suggestion clicked', bird.bird_common_name);
    setBirdName(bird.bird_common_name);
    setBirdID(bird.bird_id);
    setBirdSugClicked(true);
  };

  const getAddressFromBrowser = () => {
    setWaiting(!waiting);
    console.log('waiting? ', waiting);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('location when clicked', position);
      setWaiting(false);
      setLocationObj({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }

  const checkAddress = () => {
    // setWaiting(!waiting);
    const addressString = place + street + ' ' + state + ' ' + zip;
    axios.post('/location', {
      address: addressString
    })
      .then(results => {
        const options = results.data;
        setAddressOptions(options);
        setAddressValReturned(true);
        // setWaiting(!waiting);
      })
      .catch(err => {
        const noAddresses = { formatted_address: "No results: please try a different address" }
        setAddressOptions([noAddresses]);
        setAddressValReturned(true);
      })
      // not really sure about the lines below so leaving them for now.
    setZip('');
    setStreet('');
    setState('');
    setPlace('');
  };

  const selectAddress = (index) => {
    let latLong = addressOptions[index].geometry.location;
    setLocationObj(latLong);
    setAddressValReturned(false);
  };


  const submitForm = (event) => {
    event.preventDefault();
    const birdInfo = {
      commonName: birdName,
      note: note,
      dateSeen: dateSeen,
      user_id: userID,
      bird_id: birdID,
      location: locationObj,
      // photo: birdURL
    };
    console.log(birdInfo);

    axios.post('/birds', birdInfo)
      .then((data) => {
        console.log('bird post data: ', data);
        // propably update too
        update();
        close();
      })
      .catch((err) => {
        console.log('error posting bird sighting: ', err);
      });
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <button
          onClick={() => { close(); }}>
          CLOSE
        </button>
        <br />
        <br />
        <form>
          {!birdSugClicked && (
          <div
            className="dropdown">
            <label>Birds Common Name</label>
            <input
              type="text"
              placeholder="ex. cardinal"
              onChange={onBirdName}
            />
            {(suggestedBirds.length > 0) && (
              <div className="bird-suggestions">
                {suggestedBirds.map((bird, i) => {
                  // console.log(bird);
                  return (
                    <option  className="bird-suggestion-entry" key={i}
                    onClick={() => { suggestionClicked(bird); }}>
                      {bird.bird_common_name}
                    </option>
                  );
                })}
              </div>)}
          </div>)}
          {birdSugClicked && <div>{`You Clicked ${birdName}`}</div>}
          <br />
          <br />
          <label>Personal Note</label>
          <input type="textarea" placeholder="a place to jot down your thoughts on this or future birdsightings" onChange={onNote} />
          <br />
          <br />
          <label>Date Seen</label>
          <input type="date" onChange={onDateSeen} />
          <br />
          <br />
          {/* <label>Nickname of Location seen</label>
          <input type="text" placeholder="ex. park on 1st" onChange={onPlaceName} />
          <br /> */}
          <button className="bird-right" type="button" onClick={getAddressFromBrowser}>grab location</button>
          <button className="bird-left" onClick={typeAddressIn} type="button">fill out location or zip</button>
          {typeAddress && (
            <div>
              {/* address form to get here once I have better idea of how many states */}
              <label>zip code</label>
              <input type="text" placeholder="ex. 12345" onChange={onZip} />
              <br />
              OR
              <br />
              <label>Place</label>
              <input type="text" placeholder="ex. Central Park" onChange={onPlace} />
              <br />
              OR
              <br />
              <label>Street Address</label>
              <input type="text" placeholder="ex. 123 main st" onChange={onStreet} />
              <br />
              <label>State initials?</label>
              <input type="text" placeholder="ex. VA" onChange={onState} />
              <br />
              {
                addressValReturned &&
                addressOptions.map((option, index) => {
                  return (
                    <DropDownDiv
                      key={index}
                      index={index}
                      onClick={() => { selectAddress(index) }}>
                      {option.formatted_address}
                    </DropDownDiv>
                  );
                })
              }
              <button type="button" onClick={checkAddress}>check address</button>

            </div>
          )}
          <br />
          <br />
              <label>Select a Photo of the Bird Seen!</label>
              <input type="file"   />
              <br />
          {/*use birdURL and setBirdURL to store url in state, once set i'd check with Andy for what all needs to happen along the req chain starting with variable passed from here*/}
          <br />
          {(!waiting) && <button type="submit" onClick={submitForm}>Submit</button>}
          {waiting && <div>Waiting on Location Grab</div>}
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NewBirdForm;
