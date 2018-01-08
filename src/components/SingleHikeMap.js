import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';
import { SingleHikeMarker } from './SingleHikeMarker'

// this stateless component is used in the HikeDetailsModal to display a map with a pin for the hike whos details are show
// in the future I will also want to display the track for the hike (based on trackpoint) on this map
export const SingleHikeMap = withGoogleMap(props => (
  <GoogleMap
  // pass the onMapMounted function as a ref in order to save a map object somewhere in our class
  // render an instance of SingleHikeMarker to get a pin for the hikes location on the map -- pass the lat and lng to set the marker on the map
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
