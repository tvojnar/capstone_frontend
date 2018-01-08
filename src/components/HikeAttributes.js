import React, { Component } from 'react';
import { HikeLocation } from './HikeLocation';

// use this component to render the Location, Length, and Elevation components
export class HikeAttributes extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
    <div>
      <p>HikeAttributes</p>
      <HikeLocation region={this.props.hikeData.region}/>
    </div>
    )
  } // render
} // HikeAttributes
