import React, { Component } from 'react';

export class HikeLocation extends Component {

  render() {
    console.log('in HikeLocation render');
    const region = this.props.region
    console.log(region);
    return(
      <div>
        <h4>Location</h4>
        <p>{region}</p>
      </div>
    )
  } // render
} // HikeLocation
