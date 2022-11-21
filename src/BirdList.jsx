import React, {useState, useEffect} from 'react';
import BirdBinderEntry from './BirdBinderEntry.jsx';
import BirdCard from './birdCard.jsx';

const BirdList = (props) => {
  //need some menu or toggle switch to determine card sort




  return (
    <div>
      <h1>Bird Collection</h1>
      <button>Add Bird Sighting</button>
      {/* filter option for alphabetical and something else date scene? */}
      {[1,1,1].map((bird, i) => {
        return <BirdBinderEntry key={i} />
      })}

    <form>
      <label>Birds Common Name</label>
      <input type="text" placeholder="ex. cardinal" />
      <label>Personal Note</label>
      <input type="textarea" placeholder="a place to jot down your thoughts on this or future birdsightings"/>
      <label>Date Scene</label>
      <input type="date"/>
      {/* date from calendar input?
      photo from cloudinary?
      location? */}
      <button>Submit</button>
    </form>
    <BirdCard />
    </div>
  )
}

export default BirdList;

// import BirdList from './BirdList.jsx';//remove whole line

{/* <BirdList></BirdList>//remove whole line */}