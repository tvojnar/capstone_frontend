import React, { Component } from 'react';
import SingleHikeMarker from './SingleHikeMarker';
import { SingleHikeMap } from './SingleHikeMap';


// renders the map for the HikeDetailsModal
// this map doesn't need all the extra methods of Map.js because it is a stationary pin, and when I add the trackpoint that should be stationary too
export class MapHikeDetails extends Component {
  constructor(props) {
    super(props)



    // set the zoom a little closer so we can see more details around the hike
    this.zoom = 11
  }


  render() {
    // use the lat and lng  passed as props from MapHikeDetails to set the center point of the SingleHikeMap
    const lat = this.props.lat;
    const lng = this.props.lng;

    // pass the SingleHikeMap an instance of SingleHikeMap to render on the map
    const hike = <SingleHikeMarker lat={lat} lng={lng}/>

    // return an instance of SingleHikeMap, which is the map that will be rendered on the HikeDetailsModal
    return(
      <div style={{width: `750px`, height: `400px`}}>
        <SingleHikeMap
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
          hike={hike}
        />
      </div>
    );
  }
}

export default MapHikeDetails
