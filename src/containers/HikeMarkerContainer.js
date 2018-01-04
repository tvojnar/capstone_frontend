import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import HikeMarker from '../components/HikeMarker';

// renders a marker based on lat and lng passed via props
export class HikeMarkerContainer extends Component {
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
    const showTooltip = this.state.showTooltip

    // const {lat, lng, name, description} = this.props

    // props are passed from Map when it renders each HikeMarker
    const hikeData = {
      lat: this.props.lat,
      lng: this.props.lng,
      name: this.props.name,
      description: this.props.description
    }

    return <HikeMarker
      hikeDetails={hikeData} showTooltip={showTooltip} onClick={this.clickTooltip.bind(this)} closeWindow={this.closeWindow.bind(this)}/>
  } // render
} // class

export default HikeMarkerContainer
