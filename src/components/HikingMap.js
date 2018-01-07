import { withGoogleMap, GoogleMap } from 'react-google-maps';
import {HikeMarkerContainer} from '../containers/HikeMarkerContainer';
import React from 'react';

export const HikingMap = withGoogleMap(props => (
  <GoogleMap
  // pass the onMapMounted function as a ref in order to save a map object somewhere in our class
  ref={props.onMapMounted}
  onZoomChanged={props.handleMapChanged}
  onDragEnd={props.handleMapChanged}
  onBoundsChanged={props.handleMapFullyLoaded}
  defaultCenter={props.center}
  defaultZoom={props.zoom}>{
      props.hikes.length > 0 && props.hikes.map(hike => (
        <HikeMarkerContainer key={`hike${hike.id}`}
                     id={hike.id}
                     lat={hike.start_lat}
                     lng={hike.start_lng}
                     description={hike.description}
                     name={hike.name}/>
      ))
    }
  </GoogleMap>
));
