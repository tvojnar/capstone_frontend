import { withGoogleMap, GoogleMap } from 'react-google-maps'
import React, { Component } from 'react';
import {HikeMarker} from './HikeMarker'


const AirbnbMap = withGoogleMap(props => (
  <GoogleMap
  // pass the onMapMounted function as a ref in order to save a map object somewhere in our class
  ref={props.onMapMounted}
  onZoomChanged={props.handleMapChanged}
  onDragEnd={props.handleMapChanged}
  onBoundsChanged={props.handleMapFullyLoaded}
  defaultCenter={props.center}
  defaultZoom={props.zoom}>{
      props.hikes.length > 0 && props.hikes.map(hike => (
        <HikeMarker key={`hike${hike.id}`}
                     id={hike.id}
                     lat={hike.latitude}
                     lng={hike.longitude}
                     description={hike.description}
                     name={hike.name}/>
      ))
    }
  </GoogleMap>
));

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
    // TODO: maybe be able to dynamically set the starting center point of the map?
    this.state = {
      lat: 46.6062,
      lng: -122.3321,
      hikes: [],
    };
  }

  // called when the maps boundaries have changed
  // calls three functions to change the map boundaties and center point and make an api call to get the hikes within those boundaries
  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
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

  // for right now this only places one point
  fetchPlacesFromApi() {
    this.setState({ places: [] })

    fetch(`/api/hikes?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.max}&max_lat=${this.yMapBounds.min}`,
      { method: 'GET' })
      .then((response) => {
        console.log('in then');
        console.log(response);
        response.json()
      })
      .then((response) => this.setState({ places: response }))
  }

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
    // use this to set the center point
    const {lat, lng, hikes} = this.state;


    // return the map
    // the center point is defined the state
    // By defining a GoogleMap component (from the react-google-maps library) outside of the Map component, wrapped in the withGoogleMaps method it makes it so that each time we update a components state we will only re render the components on the map and not the entire map :)
    return(
      <div style={{width: `750px`, height: `750px`}}>
      // just so I can see that these variables are updating when I change the map boundaries
      <ul>
        <li>lng: {lng}</li>
        <li>lat: {lat}</li>
        <li>xMapBounds.min: {this.xMapBounds.min}</li>
        <li>xMapBounds.max: {this.xMapBounds.max}</li>
        <li>yMapBounds.min: {this.yMapBounds.min}</li>
        <li>yMapBounds.max: {this.yMapBounds.max}</li>
      </ul>
      <AirbnbMap
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
    );
  }
}

export default Map
