import {HikeMarkerContainer} from '../containers/HikeMarkerContainer';
import React from 'react';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"

export const SetPinMap = compose(
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
    center={props.center}
    defaultZoom={props.zoom}>
  >
  {props.hike}
  </GoogleMap>
)






// import { withGoogleMap, GoogleMap } from 'react-google-maps';
// import React from 'react';
//
// // this is the map that is rendered on the FormContainer
// // props.hike is an instance of SetPinMarker so that the map will render a marker at the location of the hike
// // this pin will only be rendered once the user has set the location of the pin via the SetPinForm or the LatLngSetPinForm
// export const SetPinMap = withGoogleMap(props => (
//   <div>
//     <GoogleMap
//       center={props.center}
//       defaultZoom={props.zoom}>
//         {props.hike}
//       </GoogleMap>
//   </div>
// ));
