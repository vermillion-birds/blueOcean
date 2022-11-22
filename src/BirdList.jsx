/* eslint-disable operator-assignment */
/* eslint-disable comma-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useState, useEffect} from 'react';
import BirdBinderEntry from './BirdBinderEntry.jsx';
import BirdCard from './birdCard.jsx';
import NewBirdForm from './NewBirdForm.jsx';

const BirdList = (props) => {
  // need some menu or toggle switch to determine card sort
  const [addingBird, setAddingBird] = useState(false);
  const [currUser, setCurrUser] = useState(true);
  const [cardRows, setCardRows] = useState([]);
  const birds = [[1], [1], [1], [1], [1]];

  const nowAddingBird = () => {
    setAddingBird(!addingBird);
  };

  const generateCardRows = () => {
    var cardStorage = [];
    console.log('hit');
    // cardStorage.concat(birds);

    for (let i = 0; i < birds.length; i++) {
      if (i === birds.length - 1) {
        cardStorage.push([i + 1]);
      } else {
        cardStorage.push([i, i + 1]);
      }
    }

    console.log(cardStorage);
    setCardRows(cardStorage);
  };

  useEffect(() => {
    generateCardRows();
  }, [birds]);

  return (
    <div>
      <h1>Bird Collection</h1>
      {currUser && <button onClick={nowAddingBird}>Add Bird Sighting</button>}
      {/* filter option for alphabetical and something else date scene? */}
      {(cardRows.length > 0) && cardRows.map((row) => {
        if (row[1]) {
          return (
            <div>
              <BirdBinderEntry bird={row[0]} />
              <BirdBinderEntry bird={row[1]} />
            </div>
          );
        }
        return (
          <div>
            <BirdBinderEntry bird={row[0]} />
          </div>
        );
      })}
      {/* {[1,1,1].map((bird, i) => {
        return <BirdBinderEntry key={i} />
      })} */}

      {addingBird && <NewBirdForm close={() => { setAddingBird(); }} />}
      <BirdCard />
    </div>
  );
};

export default BirdList;
