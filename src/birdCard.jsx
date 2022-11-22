import React, {useEffect, useState} from "react"
import Card from '@mui/material/Card';
import styled, { css } from 'styled-components';
const Container = styled.div`
max-width: 400px;
margin: 0 auto;
margin-top: 20vh;
`;


const SectionCard = styled.aside`

  border: 4px solid #213547;;
  border-radius: 40px;
  box-shadow: 20px 20px 20px #213547;;
  padding: 5rem;
  background-color: #686868;
`;

const SectionImage = styled.img`
margin-top: -1.25rem;
margin-left: -1.25rem;
width: calc(100% + 2.5rem);
height: 214px;
object-fit: cover;
border: 6px solid #83c9f4;
`;

const Tag = styled.span`
padding: 4px 8px;
border: 1px solid #e5eaed;
border-radius: 50px;
font-size: 12px;
font-weight: 600;
color: #83c9f4;
`;

const Decription = styled.p`
font-size: 14px;
color: #7f8c9b;
line-height: 150%;
color: #83c9f4;
padding: 16px 8px 8px 8px;
`

const BirdCard = () => {




  // section aside:hover {
  //   box-shadow: var(--box-shadow) var(--color-bg-secondary);
  //   cursor: pointer;
  // }



  return (
    <Container>
       <SectionCard>
      <aside>
    <h3>Bird Name</h3>
 <SectionImage src={'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=1600'} alt="header image"height="400" width="384"
      />
  <Tag>Last Seen:</Tag><Tag>Count times seen:</Tag>
  <Decription>This is the elusive baby duck. comming from the duck family. It has long been held as the cutiest animal in the kingdom!</Decription>

  </aside>
    </SectionCard>
    </Container>



  )
}


export default BirdCard