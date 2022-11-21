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

  const nowAddingBird = () => {
    setAddingBird(!addingBird);
  };

  return (
    <div>
      <h1>Bird Collection</h1>
      <button onClick={nowAddingBird}>Add Bird Sighting</button>
      {/* filter option for alphabetical and something else date scene? */}
      {[1,1,1].map((bird, i) => {
        return <BirdBinderEntry key={i} />
      })}

      {addingBird && <NewBirdForm close={() => { setAddingBird(); }} />}
      <BirdCard />
    </div>
  );
};

export default BirdList;
