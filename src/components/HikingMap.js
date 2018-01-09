import { withGoogleMap, GoogleMap } from 'react-google-maps';
import {HikeMarkerContainer} from '../containers/HikeMarkerContainer';
import React from 'react';

export const HikingMap = withGoogleMap(props => (
  <GoogleMap
  // pass the onMapMounted function as a ref in order to save a map object somewhere in our class
  // pass the HikeMarkerContainer all of the hike info from the API for the hike so that I can access it all in the hike details modal that will be rendered by the info window of each hike
  ref={props.onMapMounted}
  onZoomChanged={props.handleMapChanged}
  onDragEnd={props.handleMapChanged}
  onBoundsChanged={props.handleMapFullyLoaded}
  defaultCenter={props.center}
  defaultZoom={props.zoom}>{
      props.hikes.length > 0 && props.hikes.map(hike => (
        <HikeMarkerContainer key={`hike${hike.id}`}
                     hikeData={hike}/>
      ))
    }
  </GoogleMap>
));
