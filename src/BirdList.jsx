/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
/* eslint-disable comma-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useState, useEffect} from 'react';
import BirdBinderEntry from './BirdBinderEntry.jsx';
import BirdCard from './birdCard.jsx';
import NewBirdForm from './NewBirdForm.jsx';
import './assets/BirdList.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const BirdList = ({userID, friend, back, allBirds}) => {
  // need some menu or toggle switch to determine card sort
  const [addingBird, setAddingBird] = useState(false);
  const [currUser, setCurrUser] = useState(false);
  const [cardRows, setCardRows] = useState([]);
  const [cardView, setCardView] = useState(false);
  const [cardsBird, setCardsBird] = useState({});
  const [birds, setBirds] = useState([]);
  const [alpBirds, setAlpBirds] = useState([]);
  const [recBirds, setRecBirds] = useState([]);
  const [sort, setSort] = useState(true);
  const history = useHistory();

  // console.log('id', userID);

  const getBirdInfo = () => {
    let id = userID;
    if (typeof friend === 'object' && Object.keys(friend).length > 0) {
      id = friend.friend_user_id;
    }
    // console.log(id, friend);
    // conditional to check if friend or user
    axios.get(`/birdcards/${id}`)
      .then((data) => {
        let copy1 = data.data.slice();
        let copy2 = data.data.slice();

        let sorted = copy1.sort(function compareFn(a, b) {
          if (a.common_name.toUpperCase() < b.common_name.toUpperCase()) {
            return -1;
          }
          if (a.common_name.toUpperCase() < b.common_name.toUpperCase()) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        let sortedRec = copy2.sort(function compareFn(a, b) {
          if (a.first_seen > b.first_seen) {
            return -1;
          }
          if (a.first_seen < b.first_seen) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        setRecBirds(sortedRec);
        setAlpBirds(sorted);
        setBirds(data.data);
      })
      .catch((err) => {
        console.log('error getting bird cards info', err);
      });
  };


  useEffect(() => {
    getBirdInfo();
    if (!(typeof friend === 'object' && Object.keys(friend).length > 0)) {
      setCurrUser(true);
    }
  }, [userID]);// ?

  const nowAddingBird = () => {
    setAddingBird(!addingBird);
    console.log('all birds: ', allBirds);
    console.log('user: ', userID);
    console.log('birds: ', birds);
  };

  const cardClicked = (card) => {
    card = card || {};
    setCardsBird(card);
    setCardView(!cardView);
  };

  const generateCardRows = () => {
    const cardStorage = [];
    // cardStorage.concat(birds);

    for (let i = 0; i < birds.length; i += 2) {
      if (i === birds.length - 1) {
        cardStorage.push([birds[i]]);
      } else {
        cardStorage.push([birds[i], birds[i + 1]]);
      }
    }
    setCardRows(cardStorage);
  };

  const sortChange = () => {
    setSort(!sort);

    if (sort) {
      setBirds(alpBirds);
    } else {
      setBirds(recBirds);
    }

  };

  useEffect(() => {
    generateCardRows();
    console.log('bird card data: ', birds);
  }, [birds]);

  return (
    <div>
      {!cardView && (
        <div>
          <h1>Bird Collection</h1>
          <button onClick={() => {history.push('/user')}}>Return Home</button>
           <br/>
           <br/>
          {!currUser && <button onClick={back}>Back to Friend List</button>}
          {currUser && <button onClick={nowAddingBird}>Add Bird Sighting</button>}
          {/* filter option for alphabetical and something else date scene? */}
          <br/>
          <br/>
          {sort && <button onClick={sortChange}>Alphabetical</button>}
          {!sort && <button onClick={sortChange}>Most Recent</button>}
          <br/>
          <br/>
          {(cardRows.length > 0) && cardRows.map((row, i) => {
            if (row[1]) {
              return (
                <div key={i} className="full-card-row">
                  <BirdBinderEntry clicked={(bird) => { cardClicked(bird); }} bird={row[0]} />
                  <BirdBinderEntry clicked={(bird) => { cardClicked(bird); }} bird={row[1]} />
                </div>
              );
            }
            return (
              <div key={i} className="half-card-row">
                <BirdBinderEntry clicked={(bird) => { cardClicked(bird); }} bird={row[0]} />
              </div>
            );
          })}
          {/* {[1,1,1].map((bird, i) => {
        return <BirdBinderEntry key={i} />
      })} */}

          {addingBird && <NewBirdForm close={() => { setAddingBird(); } } allBirds={allBirds} userID={userID} birdCards={birds}
          update={() => {getBirdInfo()}} />}
        </div>
      )}
      {cardView && <BirdCard bird={cardsBird} back={() => {cardClicked()}} userID={userID} />}
    </div>
  );
};

export default BirdList;
// app.get('/birdCards/:user_id', ((req, res) => {
//   console.log(req.params);
//   res.send('hitting sever from get birdcards');
// }))
