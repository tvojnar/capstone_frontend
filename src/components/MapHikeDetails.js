
import React from 'react';
import { BaseMap } from './BaseMap';
import $ from 'jquery';
import {SingleHikeMap} from './SingleHikeMap';

// Map is a child class of MadeMap. BaseMap has all of the methods for reloading the map on zoom and drag movements
 class MapHikeDetails extends BaseMap {
  constructor(props) {
    super(props)

    // Set state for lat and lng based on the start_lat and start_lng from props
    // this lat and lng is used to set the center point of the map
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
    }; // state
  }  // constructor


  // TODO: might need to customize this method once I am displaying trackpoint for the hike :)
  // called when the maps boundaries have changed
  // handleMapChanged() {
  //   super.handleMapChanged()
  //   // TODO: when I am getting trackpoints from the API I will want them to dynamically show up as the map is dragged and dropped, so I might want to do an api call to get them? Or I will just pass all the trackpoints from props to this component and display them on the map.....
  //   // this.fetcTrackPointsFromApi();
  // } // handleMapChanged


  render() {

    // use this to set the center point
    const {lat, lng} = this.state;


    // return the map
    // the center point is defined the state
    // By defining a GoogleMap component (from the react-google-maps library) outside of the Map component, wrapped in the withGoogleMaps method it makes it so that each time we update a components state we will only re render the components on the map and not the entire map :)
    return(

      <div style={{width: `750px`, height: `750px`}}>

      <SingleHikeMap
      onMapMounted={this.handleMapMounted.bind(this)}
      handleMapChanged={this.handleMapChanged.bind(this)}
      handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
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
      lat={lat}
      lng={lng}
      />
      </div>
    ); // return
  } // render
} // Map

export default MapHikeDetails
