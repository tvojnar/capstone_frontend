import {HikeMarkerContainer} from '../containers/HikeMarkerContainer';
import React from 'react';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"

export const SingleHikeMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD6xT_duuOpLAzZEE-yHY1l7do810TIL_8&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
  >
  {props.hike}
  </GoogleMap>
)
