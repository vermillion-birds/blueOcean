import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapsApiKey } from '../secrets.js';
//will need a a get to get geo loc of all bird pictures related to that bird, create an array as follows and then map through the array
// the center location should be set to where the user's picture was located to.

const Map = () => {
  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 41.3954,
        lng: 2.162
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      name: "Location 3",
      location: {
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ];
  const mapStyles = {
    height: "50vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}>
        {
          locations.map(item => {
            return (
              <Marker key={item.name} position={item.location} />
            )
          })
        }
      </GoogleMap>
    </LoadScript>

  )

};

export default Map;
// navigator.geolocation.getCurrentPosition((position) => {
//   console.log('Latitude is :', position.coords.latitude);
//   console.log('Longitude is :', position.coords.longitude);
//   setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
// });