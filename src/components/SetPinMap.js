import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';

// this is the map that is rendered on the FormContainer
// props.hike is an instance of SetPinMarker so that the map will render a marker at the location of the hike
// this pin will only be rendered once the user has set the location of the pin via the SetPinForm or the LatLngSetPinForm
export const SetPinMap = withGoogleMap(props => (
  <div>
    <GoogleMap
      center={props.center}
      defaultZoom={props.zoom}>
        {props.hike}
      </GoogleMap>
  </div>
));
