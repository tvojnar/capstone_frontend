import React, {Component} from 'react';

export class HikeLength extends Component {
  render() {
    if (this.props.miles) {
      console.log('in Hike Length and miles are: ');
      console.log(this.props.miles);
      return(
        <div>
          <h4>Length</h4>
          <p>{this.props.miles} miles</p>
        </div>
      )
    } else {
      return
    }
    return
  } // render
} // Length
