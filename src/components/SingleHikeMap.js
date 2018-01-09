import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';
import { SingleHikeMarker } from './SingleHikeMarker'

// this is the map that is rendered on the HikeDetailsModal
// props.hike is an instance of SingleHikeMarker so that the map will render a marker at the location of the hike in the HikeDetailsModal
export const SingleHikeMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
      {props.hike}
    </GoogleMap>
));
