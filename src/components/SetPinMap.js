import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';

// this is the map that is rendered on the HikeDetailsModal
// props.hike is an instance of SingleHikeMarker so that the map will render a marker at the location of the hike in the HikeDetailsModal
export const SetPinMap = withGoogleMap(props => (
  <div>
    <GoogleMap
      center={props.center}
      defaultZoom={props.zoom}>
        {props.hike}
      </GoogleMap>
  </div>
));
