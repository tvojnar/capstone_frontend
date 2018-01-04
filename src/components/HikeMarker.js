import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import HikeInfoWindow from './HikeInfoWindow'

// renders a marker based on lat and lng passed via props
export class HikeMarker extends Component {

  render() {
    const tripData = {
      lat: this.props.hikeDetails.lat,
      lng: this.props.hikeDetails.lng,
      description: this.props.hikeDetails.description,
      name: this.props.hikeDetails.name,
    }


    // return a Marker, which is imported from the react-google-maps library
    return(
      // always make a marker for each hike
      // on click toggle true/false for the value of showTooltip
      // if the state of showTooltip is true then show the info window for the hike
      <Marker
      position={{
        lat: parseFloat(tripData.lat),
        lng: parseFloat(tripData.lng)
      }}
      onClick={this.props.onClick}>
      {this.props.showTooltip && (
        <HikeInfoWindow description={tripData.description}
        name={tripData.name}
        // close the info window when the x is clicked on
        closeWindow={this.props.closeWindow}/>
      )}
      </Marker>
    );
  }
}

export default HikeMarker
