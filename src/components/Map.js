import { withGoogleMap, GoogleMap } from 'react-google-maps'
import React, { Component } from 'react';
import {HikeMarker} from './HikeMarker'


const AirbnbMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom}>{props.places}</GoogleMap>
));

export class Map extends Component {
  constructor(props) {
    super(props)

    this.zoom = 7

    // used to define the center point
    this.state = {
      lat: 46.6062,
      lng: -122.3321
    };
  }

  render() {
    // use this to set the center point
    const {lat, lng} = this.state;
    const places = [<HikeMarker lat={lat} lng={lng} name="Test Hike" description="A lovely hike"/>]

    // return the map
    // the center point is defined the state
    // By defining a GoogleMap component (from the react-google-maps library) outside of the Map component, wrapped in the withGoogleMaps method it makes it so that each time we update a components state we will only re render the components on the map and not the entire map :)
    return(
      <div style={{width: `750px`, height: `750px`}}>
        <AirbnbMap
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          places={places}
        />
      </div>
    );
  }
}

export default Map
