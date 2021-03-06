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
    // pass SingleHikeMap hike so that it can render this marker (created above)
    // pass SingleHikeMap trackpoints so that it if a gpx track has been uploaded for the hike it can render a Polyline for it using the trackpoints data
    return(
      <div className='singelHikeMap'>
        <SingleHikeMap
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          hike={hike}
          trackpoints={this.props.trackpoints}
        />
      </div>
    );
  }
}

export default MapHikeDetails
