
import React, { Component } from 'react'
import { Marker } from 'react-google-maps'

// renders a simple marker for the SingleHikeMap which is rendered in the HikeDetailsModal
export class SingleHikeMarker extends Component {
  render() {
    const {lat, lng} = this.props

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

export default SingleHikeMarker
