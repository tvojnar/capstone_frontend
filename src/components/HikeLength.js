import React, {Component} from 'react';

export class HikeLength extends Component {
  render() {
    return(
      <div>
        <h4>Length</h4>
        <p>{this.props.miles}</p>
      </div>
    )
  } // render
} // Length
