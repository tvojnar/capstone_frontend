import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';
import { SingleHikeMarker } from './SingleHikeMarker'


export const SingleHikeMap = withGoogleMap(props => (
  <GoogleMap
  // pass the onMapMounted function as a ref in order to save a map object somewhere in our class
  ref={props.onMapMounted}
  onZoomChanged={props.handleMapChanged}
  onDragEnd={props.handleMapChanged}
  onBoundsChanged={props.handleMapFullyLoaded}
  defaultCenter={props.center}
  defaultZoom={props.zoom}>
  {
    <SingleHikeMarker lat={props.lat} lng={props.lng}/>
    }
  </GoogleMap>
));
