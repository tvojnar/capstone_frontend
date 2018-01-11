import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';

// this is the map that is rendered on the MapAddHike
// props.hike is an instance of SetPinMarker so that the map will render a marker at the location of the hike 
export const SetPinMap = withGoogleMap(props => (
  <div>
    <GoogleMap
      center={props.center}
      defaultZoom={props.zoom}>
        {props.hike}
      </GoogleMap>
  </div>
));
