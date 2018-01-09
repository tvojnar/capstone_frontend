import React, {Component} from 'react';

export class HikeElevation extends Component {
  render() {
    return(
      <div>
        <h4>Elevation</h4>
        <p>Highest point: {this.props.maxElevation}</p>
        <p>Elevation gain: {this.props.elevationGain}</p>
      </div>
    )
  } // render
} // Length
