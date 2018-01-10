import React, { Component } from 'react';
import HikeMarker from '../components/HikeMarker';

// renders a marker based on lat and lng passed via props
// HikeMarkerContainer is a container for the stateless HikeMarker component
export class HikeMarkerContainer extends Component {
  constructor(props) {
    super(props)

    // start off with the info window not shown
    this.state = {
      showTooltip: false
    }
  }

  // when the marker is clicked on toggle showTooltip to true to show the info window
  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip })
  }

  // when the x on the info window is clicked switch showTooltip back to false to close the info window
  closeWindow() {
    this.setState({ showTooltip: false })
  }


  render() {
  // define the props to send to HikeMarker
    const showTooltip = this.state.showTooltip

    // props are passed from Map when it renders each HikeMarker
    // return an a HikeMarker component
    // HikeMarker will render an info window if showTooltip === true
    // pass all of the hikeData from the API to the HikeMarker because I will need all that info in the hike details modal that will be rendered by the info window of each hike
    return <HikeMarker
      hikeData={this.props.hikeData}
      showTooltip={showTooltip}
      onClick={this.clickTooltip.bind(this)}
      closeWindow={this.closeWindow.bind(this)}
      fetchHikes={this.props.fetchHikes}/>
  } // render
} // class

export default HikeMarkerContainer
