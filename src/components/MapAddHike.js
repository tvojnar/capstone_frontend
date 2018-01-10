import React, { Component } from 'react';
import SetPinMarker from './SetPinMarker';
import { SetPinMap} from './SetPinMap';


// renders the map for the HikeDetailsModal
// this map doesn't need all the extra methods of Map.js because it is a stationary pin, and when I add the trackpoint that should be stationary too
export class MapAddHike extends Component {
  constructor(props) {
    super(props)

    // set the zoom a little closer so we can see more details around the hike
    this.state = {
      zoom: 7,
    }
  }

// componentWillReceiveProps(nextProps){
//   this.setState({
//     lat: nextProps.lat,
//     lng: nextProps.lng
//   })
// }

  render() {
    console.log('in MapAddHike render');
    // use the lat and lng  passed as props from MapHikeDetails to set the center point of the SingleHikeMap
    const {lat, lng} = this.props;

    // pass the SetPinMap an instance of SetPinMarker to render on the map if the user has entered a name
    let hike;
     if (this.props.enteredName) {
          hike = <SetPinMarker lat={lat} lng={lng}/>
        }

    // return an instance of SingleHikeMap, which is the map that will be rendered on the HikeDetailsModal
    return(
      <div style={{width: `400px`, height: `400px`}}>
        <SetPinMap
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.state.zoom}
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

export default MapAddHike
