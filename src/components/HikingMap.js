import {HikeMarkerContainer} from '../containers/HikeMarkerContainer';
import React from 'react';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"

export const HikingMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD6xT_duuOpLAzZEE-yHY1l7do810TIL_8&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
  ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
  >
  {
        props.hikes.length > 0 && props.hikes.map(hike => (
          <HikeMarkerContainer key={`hike${hike.id}`}
                       hikeData={hike}
                       fetchHikes={props.fetchHikes}/>
        ))
      }
  </GoogleMap>
)
