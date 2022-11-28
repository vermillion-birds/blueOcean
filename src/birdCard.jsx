/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import styled, { css } from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import Map from './Map.jsx';
import birdphotos from './planz.jsx';

const SectionCard = styled.aside`
    border: 4mm ridge #213547;
    // box-shadow: 5px 5px 5px #213547;;
    padding: 2rem;
    // background-color: #2d5d7b;
    background:
    linear-gradient(lightSkyBlue, transparent),
    linear-gradient(to top left, #686868, transparent),
    linear-gradient(to top right, #213547, transparent);
    background-blend-mode: screen;
  `;

  const SectionCard2 = styled.aside`
    border: 4mm ridge #213547;
    padding: 2rem;
    background:
    linear-gradient(lightSkyBlue, transparent),
    linear-gradient(to top left, #686868, transparent),
    linear-gradient(to top right, #213547, transparent);
    background-blend-mode: screen;
  `;

const SectionImage = styled.img`
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  width: calc(100% + 1.5rem);
  height: 214px;
  object-fit: cover;
  border: 6px solid #213547;
  box-shadow: 5px 5px 5px #213547;
`;

const Tag = styled.span`

  padding: .5px;
  text-align: center;
  background: gray;
  color: white;
  font-size: 15px;
  // padding: 4px 8px;
  // border: 1px solid #e5eaed;
  // border-radius: 50px;
  // font-size: 12px;
  // font-weight: 600;
  // color: #83c9f4;
 `;
const Decription = styled.p`
  font-size: 14px;
  color: #7f8c9b;
  line-height: 150%;
  color: white;
  // padding: 16px 8px 8px 8px;
 `;

const Container = styled.div`
  box-shadow: 10px 10px 10px #213547;;
  border-radius: 20px;
  border: 10px solid #686868;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20vh;
  `;

  const Container2 = styled.div`
  box-shadow: 10px 10px 10px #213547;;
  border-radius: 20px;
  border: 10px solid #686868;
  // max-width: 400px;
  margin: 0 auto;
  margin-top: 20vh;
  width: 40vh;
  `;
const BirdCard = ({bird, back}) => {
  const [flip, setFlip] = useState(false);
  return (
    <div>
    <ReactCardFlip
      isFlipped={flip}
      flipDirection="vertical"
    >
      <Container>
        <SectionCard onClick={() => setFlip(!flip)}>
          <aside>
            <h3>{bird.scentific_name}</h3>
            <h3>AKA: {bird.common_name}</h3>
            <SectionImage
              src={birdphotos[bird.bird_id - 1] || bird.bird_photos[0]}
              alt="header image"
              height="400"
              width="384"
            />
            <div>First Seen: {bird.first_seen}</div>
            <div>Last Seen: {bird.last_seen}</div>
            <div>Times seen: {bird.count}</div>
            <h3>Decription</h3>
            <Decription>
             {bird.summary}
            </Decription>
            <h3>Personal Notes</h3>
            <Decription>{bird.note}</Decription>
          </aside>
        </SectionCard>
      </Container>
      <Container2>
        <SectionCard2 onClick={() => setFlip(!flip)}>
          <aside>
            <h3>Sighting Locations</h3>
            <Map locations={bird.bird_location} />
          </aside>
        </SectionCard2>

      </Container2>

    </ReactCardFlip>
 <div>
  <button onClick={()=>{
    back()}} style={{marginTop: 50}}>back</button>
    </div>
 </div>
  );
};
export default BirdCard;
