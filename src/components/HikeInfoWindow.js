import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';
import HikeDetailsModal from '../modal/HikeDetailsModal';

// component to display an info window when a hike pin is clicked on
export class HikeInfoWindow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showHikeDetailsModal: false,
    }
    this.handleClick = this.handleClick.bind(this);
  } // constructor

  handleClick() {
    this.setState({showHikeDetailsModal: true})
  }

  render() {
    // set the description and name to display from the props passed in by HikeMarker
    const description = this.props.hikeData.description
    const name = this.props.hikeData.name

    // pass the HikeDetailsModal all of the info for the hike via hikeData and the method to close the info window via closeInfoWindow (this will happen when the 'close' button in the HikeDetailsModal is clicked)
    let hikeDetailsModal;
    if (this.state.showHikeDetailsModal) {
      hikeDetailsModal = <HikeDetailsModal id={this.props.hikeData.id}
      closeInfoWindow={this.props.closeWindow}
      fetchHikes={this.props.fetchHikes}/>
    }

    return(
      // closeWindow function is defined in HikeMarker component, which toggles showToolip to false
      // I think onCloseClick is a specific InfoWindow function that is for when the x is clicked
      <div>
        { hikeDetailsModal }

        <InfoWindow onCloseClick={this.props.closeWindow} >
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <button onClick={this.handleClick}>Trip details</button>
          </div>
        </InfoWindow>
      </div>
    );
  }
}

export default HikeInfoWindow
