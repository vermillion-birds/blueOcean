/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import styled, { css } from 'styled-components';
import ReactCardFlip from 'react-card-flip';
<<<<<<< HEAD

=======
>>>>>>> f2b40eaa9d5eeb59fb53aa050ef8f7e53454e4de
import Map from './Map.jsx';

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



  const SectionCardB = styled.aside`
  border: 4mm ridge #213547;
  padding: 2rem;
  background:
  linear-gradient(lightSkyBlue, transparent),
  linear-gradient(to top left, #686868, transparent),
  linear-gradient(to top right, #213547, transparent);
  background-blend-mode: screen;
  width:100%;
  // height: 200%;
  // object-fit: cover;

`;



const SectionImage = styled.div`
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
const BirdCard = ({bird, back}) => {
  const [flip, setFlip] = useState(false);
  console.log(bird," this is the bird object", back , "this is the back to the admin page ")

  return (
    <ReactCardFlip
      isFlipped={flip}
      flipDirection="vertical"
    >
      <Container>
        <SectionCard onClick={() => setFlip(!flip)}>
          <aside>
            <h3>Bird Name</h3>
            <h3>Common Name</h3>
            <SectionImage
              src="https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="header image"
              height="400"
              width="384"
            />
            <Tag>First Seen:   </Tag>
            <Tag>Last Seen:    </Tag>
            <Tag>Times seen:   </Tag>
            <h3>Decription</h3>
            <Decription>
              This is the elusive baby duck. coming from the duck family.
              It has long been held as the cutiest animal in the kingdom!
            </Decription>
            <h3>Personal Notes</h3>
            <Decription>This is one of the cutest little birdies i have ever seen</Decription>
          </aside>
        </SectionCard>
      </Container>
      <Container>
        <SectionCardB onClick={() => setFlip(!flip)}>
          <aside>
            <h3>Location</h3>
            <Map />
          </aside>
        </SectionCardB>
      </Container>

    </ReactCardFlip>
  );
};
export default BirdCard;
