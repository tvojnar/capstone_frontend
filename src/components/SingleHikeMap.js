import React from 'react';
mport {HikeMarkerContainer} from '../containers/HikeMarkerContainer';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"

export const SingleHikeMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
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
