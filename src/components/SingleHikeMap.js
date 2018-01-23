import React from 'react';
import {HikeMarkerContainer} from '../containers/HikeMarkerContainer';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Polygon, Polyline} from "react-google-maps"

// props.hike is the Marker for the hike
// the polyline will be the gps track of the hike if it has one
export const SingleHikeMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDz5xfxr2GdFNz--4JKd5zfkPSmJFt6jas&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap className='SingleHikeMap'
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    {props.hike}
    <Polyline path={props.trackpoints}/>
  </GoogleMap>
)
