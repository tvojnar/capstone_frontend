import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'

// component to display an info window when a hike pin is clicked on
// closeWindow function comes from the react-google-maps library
export class HikeInfoWindow extends Component {
  render() {
    // set the description and name to display from the props passed in by HikeMarker
    const {description, name} = this.props
    return(
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
