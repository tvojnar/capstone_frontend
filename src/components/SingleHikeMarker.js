import React from 'react'
import { Marker } from 'react-google-maps'

// renders a marker for the hike who's details are being shown in the HikeDetailsModal based on lat and lng passed via props
// HikeMarker is a stateless component
export const SingleHikeMarker = (props) => {
  // return a Marker, which is imported from the react-google-maps library
  return(
    <Marker
    position={{
      lat: parseFloat(props.lat),
      lng: parseFloat(props.lng)
    }}/>
  );
}
