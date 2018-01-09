import React, { Component } from 'react';

export class HikeLocation extends Component {

  render() {
    const region = this.props.region
    return(
      <div>
        <h4>Location</h4>
        <p>{region}</p>
      </div>
    )
  } // render
} // HikeLocation
