import React, { Component } from 'react';
import {ImageName} from '../components/ImageName';


export class ImageNameContainer extends Component {

  render() {
    let imageNames;
    if (this.props.imageInfo && this.props.imageInfo.length > 0) {
      let imageNameArray = [];
        console.log('in ImageNameContainer render');
        console.log(this.props.imageInfo);
      for(let image in this.props.imageInfo) {

        // console.log(image);
        // imageNameArray.push(<ImageName name={image[1].name} />)
      }
    }  // if

    return [imageNames];
  }
} // ImageName
