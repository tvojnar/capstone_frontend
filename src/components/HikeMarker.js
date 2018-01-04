import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import HikeInfoWindow from './HikeInfoWindow'

// renders a marker based on lat and lng passed via props
export class HikeMarker extends Component {
  constructor(props) {
    super(props)

    // start off with the info window not shown
    this.state = {
      showTooltip: false
    }
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip })
  }

  closeWindow() {
    this.setState({ showTooltip: false })
  }

  render() {
    const {showTooltip} = this.state
    // props are passed from Map when it renders each HikeMarker
    const {lat, lng, name, description} = this.props


    // return a Marker, which is imported from the react-google-maps library
    return(
      // always make a marker for each hike
      // on click toggle true/false for the value of showTooltip
      // if the state of showTooltip is true then show the info window for the hike
      <Marker
      position={{
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }}  
      onClick={this.clickTooltip.bind(this)}>
      {showTooltip && (
        <HikeInfoWindow description={description}
        name={name}
        // close the info window when the x is clicked on
        closeWindow={this.closeWindow.bind(this)}/>
      )}
      </Marker>
    );
  }
}

export default HikeMarker
