import { withGoogleMap, GoogleMap } from 'react-google-maps';
import React from 'react';

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
    // TODO: render pin for hike here 
  //     props.hikes.length > 0 && props.hikes.map(hike => (
  //       <HikeMarkerContainer key={`hike${hike.id}`}
  //                    hikeData={hike}/>
  //     ))
    }
  </GoogleMap>
));
