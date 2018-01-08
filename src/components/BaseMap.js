import React, { Component } from 'react';
import $ from 'jquery';
import {HikingMap} from './HikingMap';

// TODO refactor to separate Map into a container component and a presentational component
export class Map extends Component {
  constructor(props) {
    super(props)

    // how zoomed in the map starts off as
    this.zoom = 7

    // store the map boundary coordinates
    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    // start off with have mapFullyLoaded as false
    this.mapFullyLoaded = false

    // used to define the center point
    // hikes will be all the hikes visable in a map area
    // NOTE:  REMOVED FROM BASE:
    // this.state = {
    //   lat: 46.6062,
    //   lng: -122.3321,
    //   hikes: [],
    // };
  }


  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }


  // called when the maps boundaries have changed
  // calls three functions to change the map boundaties and center point and make an api call to get the hikes within those boundaries
  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    // NOTE: REMOVED FROM BASE
    // this.fetchHikesFromApi()
  }


  handleMapMounted(map) {
    // assigns to the this.map value a map object during the map initialization
    this.map = map
  }


  handleMapFullyLoaded() {
    // marks that the map has fully loaded and calls the handleMapChanged function to get the lastest data
    if (this.mapFullyLoaded)
    return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }

  // this function gets and sets the center point
  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  // NOTE: REMOVED FROM BASE
  // make an API call to get the hikes that are within the boundaries of the map
  // fetchHikesFromApi() {
  //   // clear the hikes array before making the api call
  //   this.setState({ hikes: [] })
  //
  //   // make the api call
  //   $.ajax({
  //     url: `/api/hikes?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.max}&max_lat=${this.yMapBounds.min}`,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data){
  //       console.log('successful api call!');
  //       console.log(data);
  //       // set this.state.hikes to be equal to the data for all of the hikes within the maps bounds
  //       this.setState({ hikes: data })
  //       // QUESTION: Should I have a message to the user appear when there are no hikes in the boundaries of the map?
  //     }.bind(this), // success
  //     error: function(xhr, status, err) {
  //       console.log('in error');
  //       console.log(err);
  //       // TODO: Display error message that the api call did not work.
  //     } // error
  //   }); // get request
  // } // fetchHikesFromApi

  // this function gets and sets map boundaries
  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }

  render() {
    // NOTE: REMOVED FROM BASE

  //   // use this to set the center point
  //   const {lat, lng, hikes} = this.state;
  //
  //
  //   // return the map
  //   // the center point is defined the state
  //   // By defining a GoogleMap component (from the react-google-maps library) outside of the Map component, wrapped in the withGoogleMaps method it makes it so that each time we update a components state we will only re render the components on the map and not the entire map :)
  //   return(
  //
  //     <div style={{width: `750px`, height: `750px`}}>
  //
  //     <HikingMap
  //     onMapMounted={this.handleMapMounted.bind(this)}
  //     handleMapChanged={this.handleMapChanged.bind(this)}
  //     handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
  //     center={{
  //       lat: lat,
  //       lng: lng
  //     }}
  //     zoom={this.zoom}
  //     containerElement={
  //       <div style={{ height: `100%` }} />
  //     }
  //     mapElement={
  //       <div style={{ height: `100%` }} />
  //     }
  //     hikes={hikes}
  //     />
  //     </div>
  //   );
  // }
}

export default Map
