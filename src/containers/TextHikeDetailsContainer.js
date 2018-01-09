import React, { Component } from 'react';
import { TextHikeDetails } from '../components/TextHikeDetails';

// used to return the components for the hikes description and notes
export class TextHikeDetailsContainer extends Component {



  render() {
    // to make the TextHikeDetails for the notes
   const notesData = {
     id: this.props.hikeData.id,
     title: 'Notes',
     text: this.props.hikeData.notes
   };

   // to make the TextHikeDetails for the description
   const descriptionData = {
     id: this.props.hikeData.id,
     title: 'Description',
     text: this.props.hikeData.description
   };

   // return 2 TextHikeDetails
      // one for the hike description
      // one for the hike notes
    return(
      <div>
        <TextHikeDetails data={descriptionData}/>
        <TextHikeDetails data={notesData}/>
      </div>
    )
  } // render
} // class
