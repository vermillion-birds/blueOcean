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

const BirdList = ({userId, friend, back, home}) => {
  // need some menu or toggle switch to determine card sort
  const [addingBird, setAddingBird] = useState(false);
  const [currUser, setCurrUser] = useState(true);
  const [cardRows, setCardRows] = useState([]);
  const [cardView, setCardView] = useState(false);
  const [cardsBird, setCardsBird] = useState({});
  const birds = [[1], [1], [1], [1], [1]];

  const getBirdInfo = () => {
    axios.get(`/birdcards/${1}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('error getting bird cards info', err);
      });
  };

  useEffect(() => {
    getBirdInfo();
  }, []);// ?

  const nowAddingBird = () => {
    setAddingBird(!addingBird);
  };

  const cardClicked = (card) => {
    card = card || {};
    setCardsBird(card);
    setCardView(!cardView);
  };

  const generateCardRows = () => {
    const cardStorage = [];
    // cardStorage.concat(birds);

    for (let i = 0; i < birds.length; i++) {
      if (i === birds.length - 1) {
        cardStorage.push([i + 1]);
      } else {
        cardStorage.push([i, i + 1]);
      }
    }
    setCardRows(cardStorage);
  };

  useEffect(() => {
    generateCardRows();
  }, []);

  return (
    <div>
      {!cardView && (
        <div>
          <h1>Bird Collection</h1>
          <button>Return Home</button>
          {!currUser && <button onClick={back()}>Back to Friend List</button>}
          <br/>
          {currUser && <button onClick={nowAddingBird}>Add Bird Sighting</button>}
          {/* filter option for alphabetical and something else date scene? */}
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

          {addingBird && <NewBirdForm close={() => { setAddingBird(); }} />}
        </div>
      )}
      {cardView && <BirdCard bird={cardsBird} back={() => {cardClicked()}} />}
    </div>
  );
};

export default BirdList;
// app.get('/birdCards/:user_id', ((req, res) => {
//   console.log(req.params);
//   res.send('hitting sever from get birdcards');
// }))
