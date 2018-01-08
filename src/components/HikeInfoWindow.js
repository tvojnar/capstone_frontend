import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'

// component to display an info window when a hike pin is clicked on
export class HikeInfoWindow extends Component {
  render() {
    // set the description and name to display from the props passed in by HikeMarker
    const description = this.props.hikeData.description
    const name = this.props.hikeData.name
    return(
      // closeWindow function is defined in HikeMarker component, which toggles showToolip to false
      // I think onCloseClick is a specific InfoWindow function that is for when the x is clicked
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </InfoWindow>
    );
  }
}

export default HikeInfoWindow
