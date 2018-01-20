import React, {Component} from 'react';

export class HikeElevation extends Component {
  render() {
    let maxElevation;
    if (this.props.maxElevation) {
      maxElevation = <p>Highest point: {this.props.maxElevation} ft</p>
    } else {
      maxElevation = <p>Highest point: {this.props.maxElevation}</p>
    }

    let elevationGain;
    if (this.props.elevationGain) {
      elevationGain = <p>Elevation gain: {this.props.elevationGain} ft</p>
    } else {
      elevationGain = <p>Elevation gain: {this.props.elevationGain}</p>
    }
    return(
      <div className='hikeDetails'>
        <h4>Elevation</h4>
        { maxElevation }
        { elevationGain }
      </div>
    )
  } // render
} // Length
