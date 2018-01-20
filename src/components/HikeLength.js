import React, {Component} from 'react';

export class HikeLength extends Component {
  render() {
    if (this.props.miles) {
      return(
        <div className='hikeDetails'>
          <h4>Length</h4>
          <p>{this.props.miles} miles</p>
        </div>
      )
    }
    else {
      return(
        <div className='hikeDetails'>
          <h4>Length</h4>
        </div>
      )
    }
  } // render
} // Length
