import React from 'react';
import { BaseMap } from './BaseMap';
import $ from 'jquery';
import {HikingMap} from './HikingMap';

// Map is a child class of MadeMap. BaseMap has all of the methods for reloading the map on zoom and drag movements
 class Map extends BaseMap {
  constructor(props) {
    super(props)

    // TODO: maybe be able to dynamically set the starting center point of the map?
    // set the state to set the starting center point for the map
    this.state = {
      lat: 46.6062,
      lng: -122.3321,
      hikes: [],
    }; // state
  }  // constructor


  // called when the maps boundaries have changed
  // calls three functions to change the map boundaties and center point and make an api call to get the hikes within those boundaries
  handleMapChanged() {
    super.handleMapChanged()
    this.fetchHikesFromApi();
  } // handleMapChanged


  // make an API call to get the hikes that are within the boundaries of the map
  fetchHikesFromApi() {
    // clear the hikes array before making the api call
    this.setState({ hikes: [] })

    // make the api call
    $.ajax({
      url: `/api/hikes?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.max}&max_lat=${this.yMapBounds.min}`,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('successful api call!');
        console.log(data);
        // set this.state.hikes to be equal to the data for all of the hikes within the maps bounds
        this.setState({ hikes: data })
        // QUESTION: Should I have a message to the user appear when there are no hikes in the boundaries of the map?
      }.bind(this), // success
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: Display error message that the api call did not work.
      } // error
    }); // get request
  } // fetchHikesFromApi



  render() {

    // use this to set the center point
    const {lat, lng, hikes} = this.state;


    // return the map
    // the center point is defined the state
    // By defining a GoogleMap component (from the react-google-maps library) outside of the Map component, wrapped in the withGoogleMaps method it makes it so that each time we update a components state we will only re render the components on the map and not the entire map :)
    return(

      <div style={{width: `750px`, height: `750px`}}>

      <HikingMap
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
      hikes={hikes}
      />
      </div>
    ); // return
  } // render
} // Map

export default Map
