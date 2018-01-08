import React, { Component } from 'react';
import { HikeLocation } from './HikeLocation';
import { HikeLength } from './HikeLength';


// use this component to render the Location, Length, and Elevation components
export class HikeAttributes extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    // this component returns:
        // 1. The HikeLocation component which show the region that the hike is in
        // 2. The Length component which shows how many miles the hike is
    return (
    <div>
      <p>HikeAttributes</p>
      <HikeLocation region={this.props.hikeData.region}/>
      <HikeLength miles={this.props.hikeData.miles} />
    </div>
    )
  } // render
} // HikeAttributes
