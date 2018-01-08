import React, { Component } from 'react';
import $ from 'jquery';

// TODO refactor to separate Map into a container component and a presentational component
export class BaseMap extends Component {
  constructor(props) {
    super(props)

    // how zoomed in the map starts off as
    this.zoom = 7

    // store the map boundary coordinates
    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    // start off with have mapFullyLoaded as false
    this.mapFullyLoaded = false


    // NOTE: Set state for the center point in the base class!
    // this.state = {
    //   lat: 46.6062,
    //   lng: -122.3321,
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
    this.getMapBounds();
    this.setMapCenterPoint();
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
    return
  }
}

export default Map
