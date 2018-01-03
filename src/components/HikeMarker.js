import React, { Component } from 'react'
import { Marker } from 'react-google-maps'

// renders a marker based on lat and lng passed via props
export class HikeMarker extends Component {
  render() {
    // pull the lat and lng out of the props
    const {lat, lng} = this.props

    // return a Marker, which is imported from the react-google-maps library
    return(
      <Marker
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
      />
    );
  }
}

export default HikeMarker
