import React, { Component } from 'react';
import { TextHikeDetails } from '../components/TextHikeDetails';


export class TextTripDetailsContainer extends Component {
  constructor(props) {
    super(props)
  }


  render() {
   const notesData = {
     id: this.props.hikeData.id,
     title: 'Notes',
     text: this.props.hikeData.notes
   };

   const descriptionData = {
     id: this.props.hikeData.id,
     title: 'Description',
     text: this.props.hikeData.description
   };

    return(
      <div>
        <TextHikeDetails data={descriptionData}/>
        <TextHikeDetails data={notesData}/>
      </div>
    )
  } // render
} // class

export default TextTripDetailsContainer
